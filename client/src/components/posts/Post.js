import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../reducer/post";

function Post() {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const state = useSelector((state) => state.state);

	onclick = {};
	const onChange = (e) => {
		e.preventDefault();
		setText(e.target.value);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addPost(text));
	};
	useEffect(() => {}, []);

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

			<div class='posts'>
				<div class='post bg-white p-1 my-1'>
					<div>
						<a href='profile.html'>
							<img
								class='round-img'
								src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
								alt=''
							/>
							<h4>John Doe</h4>
						</a>
					</div>
					<div>
						<p class='my-1'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
							possimus corporis sunt necessitatibus! Minus nesciunt soluta
							suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
							dolor? Illo perferendis eveniet cum cupiditate aliquam?
						</p>
						<p class='post-date'>Posted on 04/16/2019</p>
						<button type='button' class='btn btn-light'>
							<i class='fas fa-thumbs-up'></i>
							<span>4</span>
						</button>
						<button type='button' class='btn btn-light'>
							<i class='fas fa-thumbs-down'></i>
						</button>
						<a href='post.html' class='btn btn-primary'>
							Discussion <span class='comment-count'>2</span>
						</a>
						<button type='button' class='btn btn-danger'>
							<i class='fas fa-times'></i>
						</button>
					</div>
				</div>

				<div class='post bg-white p-1 my-1'>
					<div>
						<a href='profile.html'>
							<img
								class='round-img'
								src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
								alt=''
							/>
							<h4>John Doe</h4>
						</a>
					</div>
					<div>
						<p class='my-1'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
							possimus corporis sunt necessitatibus! Minus nesciunt soluta
							suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
							dolor? Illo perferendis eveniet cum cupiditate aliquam?
						</p>
						<p class='post-date'>Posted on 04/16/2019</p>
						<button type='button' class='btn btn-light'>
							<i class='fas fa-thumbs-up'></i>
							<span>4</span>
						</button>
						<button type='button' class='btn btn-light'>
							<i class='fas fa-thumbs-down'></i>
						</button>
						<a href='post.html' class='btn btn-primary'>
							Discussion <span class='comment-count'>3</span>
						</a>
						<button type='button' class='btn btn-danger'>
							<i class='fas fa-times'></i>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Post;
