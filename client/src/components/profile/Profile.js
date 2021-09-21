import React, { useEffect } from "react";
import { getById } from "../../reducer/profile";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EachProfile from "./EachProfile";

function Profile({ match }) {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth.isAuthenticated);
	const profile = useSelector((state) => state.profile.profile);
	useEffect(() => {
		dispatch(getById(match.params.id));
	}, [dispatch, match.params.id]);

	return (
		<div>
			{profile === null ? (
				<div className='container'>...LOADING</div>
			) : (
				<div className='container'>
					<Link to='/user' className='btn btn-light'>
						Quay lại người dùng
					</Link>
					{auth ? (
						<Link to='/edit-profile' className='btn btn-dark'>
							<>Chỉnh sửa profile</>
						</Link>
					) : (
						<></>
					)}
					<EachProfile profile={profile} />
				</div>
			)}
		</div>
	);
}

export default Profile;
