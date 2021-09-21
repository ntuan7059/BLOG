import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPost } from "../../reducer/post";
import PostItem from "./PostItem";

function Post() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPost());
	}, [dispatch]);
	const [text, setText] = useState("");

	const posts = useSelector((state) => state.post.posts);

	onclick = {};
	const onChange = (e) => {
		e.preventDefault();
		setText(e.target.value);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(addPost(text));
		dispatch(getPost());
		setText("");
	};

	return (
		<section class='container'>
			<h1 class='large text-primary'>Blogs</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Chào mừng bạn!
			</p>

			<div class='post-form'>
				<div class='bg-primary p'>
					<h3>Bạn đang nghĩ gì ?</h3>
				</div>
				<form class='form my-1' onSubmit={(e) => onSubmit(e)}>
					<textarea
						name='text'
						cols='30'
						rows='5'
						placeholder='Viết gì đó'
						value={text}
						onChange={(e) => onChange(e)}
						required></textarea>
					<input type='submit' class='btn btn-dark my-1' value='Submit' />
				</form>
			</div>
			{posts === null ? (
				<>...Loading</>
			) : (
				<>
					{posts.map((post) => (
						<PostItem key={post._id} post={post} />
					))}
				</>
			)}
		</section>
	);
}

export default Post;
