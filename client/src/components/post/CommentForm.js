import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCmt, updateComment } from "../../reducer/post";

function CommentForm(postId) {
	const [text, setText] = useState();
	const dispatch = useDispatch();
	const onChange = (e) => {
		e.preventDefault();
		setText(e.target.value);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(postCmt({ id: postId, text: text }));
		dispatch(updateComment());
		setText("");
	};
	return (
		<div>
			<div class='post-form'>
				<div class='bg-primary p'>
					<h3>Bình luận</h3>
				</div>
				<form class='form my-1' onSubmit={(e) => onSubmit(e)}>
					<textarea
						name='text'
						cols='30'
						rows='5'
						onChange={(e) => onChange(e)}
						placeholder='Hãy để lại bình luận của bạn'
						required></textarea>
					<input type='submit' class='btn btn-dark my-1' value='Submit' />
				</form>
			</div>
		</div>
	);
}

export default CommentForm;
