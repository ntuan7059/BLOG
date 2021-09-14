const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../module/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");

// @route GET api/auth
// @desc  get user
// @access PUBLIC
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		res.status(500).send("server error");
	}
});

// @route POST api/auth
// @desc  authenticate & get token login
// @access PUBLIC
router.post(
	"/",
	[
		check("email", "please put email").exists(),
		check("password", "pls put password").exists(),
	],
	async (req, res) => {
		const err = validationResult(req.body);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}
		const { email, password } = req.body;
		try {
			// is there any user ?
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: "invalid email" }] });
			}

			// return JWT

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
			}
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
			res.status(500).send("server error");
		}
	}
);

module.exports = router;
