import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../reducer/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentDisplay from "./CommentDisplay";

function PostSing({ match }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPostById(match.params.id));
	}, [dispatch, match.params.id]);
	const post = useSelector((state) => state.post.postId);
	return (
		<div>
			{post ? (
				<section class='container'>
					<Link to='/posts' class='btn'>
						Trở lại blog
					</Link>
					<div class='post bg-white p-1 my-1'>
						<div>
							<Link to={`/user/${post.user}`}>
								<img class='round-img' src={post.avatar} alt='' />
								<h4>{post.name}</h4>
							</Link>
						</div>
						<div>
							<p class='my-1'>{post.text}</p>
							<p className='post-date'>
								<Moment format='YYYY/MM/DD'>{post.date}</Moment>
							</p>
						</div>
					</div>
					<CommentForm postId={post._id} />
					<div className='comment'>
						{post.comments.map((comment) => (
							<CommentDisplay
								key={comment._id}
								comment={comment}
								postId={post._id}
							/>
						))}
					</div>
				</section>
			) : (
				<>...LOADING</>
			)}
		</div>
	);
}

export default PostSing;
