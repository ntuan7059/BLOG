const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


const User = require("../../module/User");
// @route POSTapi/users
// @desc  Register user
// @access PUBLIC
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "please put correct email").isEmail(),
		check("password", "enter 6 characters").isLength({ min: 6 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}
		const { name, email, password } = req.body;
		try {
			// co user chua ?
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "user aldready exist" });
			}
			// chua co? take Gravatar + creat new user
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});
			// encrypt Password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();
			// return JWT
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(payload, config.get("jwtToken"), (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.log(error.message);
		}
	}
);

module.exports = router;
