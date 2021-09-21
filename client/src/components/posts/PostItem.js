import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	likePost,
	unlikePost,
	deletePost,
	updatePosts,
	updateLike,
} from "../../reducer/post";

function PostItem({
	post: { _id, text, name, avatar, user, likes, comments, date },
}) {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const onChange = async (e) => {
		await dispatch(likePost(_id));
		dispatch(updateLike(_id));
	};
	const onChange1 = async (e) => {
		await dispatch(unlikePost(_id));
		dispatch(updateLike(_id));
	};
	const onChange2 = async (e) => {
		await dispatch(deletePost(_id));
		dispatch(updatePosts(_id));
	};

	return (
		<>
			<div className='posts'>
				<div className='post bg-white p-1 my-1'>
					<div>
						<Link to={`/user/${user}`}>
							<img className='round-img' src={avatar} alt='' />
							<h4>{name}</h4>
						</Link>
					</div>
					<div>
						<p className='my-1'>{text}</p>
						<p className='post-date'>
							<Moment format='YYYY/MM/DD'>{date}</Moment>
						</p>
						<button
							type='button'
							className='btn btn-light'
							onClick={(e) => {
								onChange(e);
							}}>
							{likes ? (
								<>
									<i className='fas fa-thumbs-up'></i>
									<span>{likes.length}</span>
								</>
							) : (
								<>
									<>
										<i className='fas fa-thumbs-up'></i>
										<span>0</span>
									</>
								</>
							)}
						</button>
						<button
							type='button'
							className='btn btn-light'
							onClick={(e) => onChange1(e)}>
							<i className='fas fa-thumbs-down'></i>
						</button>
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Bình luận{" "}
							{comments !== null ? (
								<span className='comment-count'>0</span>
							) : (
								<>
									<span className='comment-count'>0</span>
								</>
							)}
						</Link>
						{user === auth.user._id ? (
							<>
								<button
									onClick={(e) => onChange2(e)}
									type='button'
									className='btn btn-danger'>
									<i className='fas fa-times'></i>
								</button>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default PostItem;
