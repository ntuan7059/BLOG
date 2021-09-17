const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../module/Profile");
const User = require("../../module/User");
const { check, validationResult } = require("express-validator");

// @router GET API/profile/me
// @description Get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar"]
		);
		if (!profile) return res.status(400).json({ msg: "No Profile" });
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("server error");
	}
});

// @router POST API/profile
// @description create/update user profile
// @access Private
router.post(
	"/",
	[auth, [check("status", "status is reqire").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req.body);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			skills,
			githubusername,
			youtube,
			facebook,
			twitter,
			instagram,
			linkein,
		} = req.body;

		//build profile object
		const profileField = {};
		profileField.user = req.user.id;
		if (skills)
			profileField.skills = skills.split(",").map((skill) => skill.trim());
		if (company) profileField.company = company;
		if (website) profileField.website = website;
		if (location) profileField.location = location;
		if (bio) profileField.bio = bio;
		if (status) profileField.status = status;
		if (githubusername) profileField.githubusername = githubusername;

		//Build social object
		profileField.social = {};
		if (youtube) profileField.social.youtube = youtube;
		if (twitter) profileField.social.twitter = twitter;
		if (facebook) profileField.social.facebook = facebook;
		if (linkein) profileField.social.linkein = linkein;
		if (instagram) profileField.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileField },
					{ new: true }
				);
				await profile.save();
				return res.json(profile);
			}
			// create
			profile = new Profile(profileField);

			await profile.save();
			res.json(profile);
			console.log(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);
// @router GET API/profile/user/user_id
// @description get profile by ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
	try {
		const profiles = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);
		if (!profiles)
			return res.status(400).json({ msg: "there is no profile for this user" });
		res.json(profiles);
	} catch (error) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "there is no profile for this user" });
		}
		res.status(500).send("server error");
	}
});

// @router DELETE api/profile
// @description DELETE profile, user & posts
// @access Private
router.delete("/", async (req, res) => {
	try {
		// remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// remove user
		await User.findOneAndRemove({ _id: req.user.is });
		res.json({ msg: "User deleted" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});
// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
	"/experience",
	[
		auth,
		[
			check("title", "title is required").not().isEmpty(),
			check("company", "Company is required").not().isEmpty(),
			check("from", "from date is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, company, location, from, to, current, description } =
			req.body;
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server Error");
		}
	}
);
// @route   DELETE api/profile//:exp_id
// @desc    DELETE profile experience
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//GET reomove index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});
// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
	"/education",
	[
		auth,
		[
			check("school", "school is required").not().isEmpty(),
			check("degree", "degree is required").not().isEmpty(),
			check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;
		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEdu);

			await profile.save();

			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server Error");
		}
	}
);
// @route   DELETE api/profile//:exp_id
// @desc    DELETE profile education
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		//GET reomove index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
