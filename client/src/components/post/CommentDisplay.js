import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteCmt, updateComment2 } from "../../reducer/post";
import { useSelector, useDispatch } from "react-redux";

function CommentDisplay({
	postId,
	comment: { _id, text, name, avatar, user, date },
}) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.user);
	const onChange = async (e) => {
		e.preventDefault();
		await dispatch(deleteCmt(postId, _id));
		dispatch(updateComment2(_id));
	};
	return (
		<div>
			<div class='post bg-white p-1 my-1'>
				<div>
					<Link to={`/user/${user}`}>
						<img class='round-img' src={avatar} alt='' />
						<h4>{name}</h4>
					</Link>
				</div>
				<div>
					<p class='my-1'>{text}</p>
					<p class='post-date'>
						<Moment format='YYYY/MM/DD'>{date}</Moment>
					</p>
					{user === auth._id ? (
						<>
							<button
								className='btn btn-danger'
								type='button'
								onClick={(e) => onChange(e)}>
								<i className='fas fa-times'></i>
							</button>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}

export default CommentDisplay;
