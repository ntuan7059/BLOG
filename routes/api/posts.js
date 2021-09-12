const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../module/Profile");
const Post = require("../../module/Post");
const User = require("../../module/User");

// @route POST APi/post
// @descript CREATE Post
// @access  PRIVATE
router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty]],
	async (req, res) => {
		const error = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.arrays() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");
			const mewPost = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};
			const post = await newPost.save();

			res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);
// @route GET APi/post
// @descript GET all post
// @access  PRIVATE

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});
// @route GET APi/post:id
// @descript GET post by id
// @access  PRIVATE

router.get("/:id", auth, async (req, res) => {
	try {
		const posts = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "post not found" });
		}

		res.json(posts);
	} catch (error) {
		console.error(error.message);
		if (error.kind === "ObjectId") {
			return res.status(404).json({ msg: "post not found" });
		}
		res.status(500).send("Server error");
	}
});
// @route GET APi/post
// @descript Delete post
// @access  PRIVATE

router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find(req.params.id);
		// check user
		if (!post) {
			return res.status(404).json({ msg: "page not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "user not authorized" });
		}

		await post.remove();

		res.json({ msg: "post removed" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
});

// @route PUT APi/posts/like/:id
// @descript Like a post
// @access  PRIVATE

router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//check if the post has already been liked
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: "Post already liked" });
		}
		post.likes.unshift({ user: req.user.id });
		//Get remove index
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
// @route POST APi/post/comment/:id
// @descript Comment on post
// @access  PRIVATE
router.post(
	"/comment/:id",
	[auth, [check("text", "Text is required").not().isEmpty]],
	async (req, res) => {
		const error = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.arrays() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = await User.findById(req.user.id);
			const mewComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);
			await post.save();

			res.json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("server error");
		}
	}
);
// @route POST APi/post/comment/:id
// @descript DELETE comment
// @access  PRIVATE

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Pull out comment
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		//make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: "Comment not exist" });
		}
		//check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		// Get remove index
		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);
		await post.save();

		res.json(post.comments);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("server error");
	}
});

module.exports = router;
