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
			console.log("check");
			return res.status(400).json({ errors: err.array() });
		}
		const { name, email, password } = req.body;
		try {
			// is user existed ?
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ error: "user existed" });
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

			user.password = await bcrypt.hash(user.password, 10);

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
