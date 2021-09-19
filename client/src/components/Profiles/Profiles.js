import React, { useEffect } from "react";
import { deleteProfile, getAll } from "../../reducer/profile";
import { useDispatch, useSelector } from "react-redux";
import ProfileItems from "./ProfileItems";
function Profiles() {
	const profile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAll());
	}, [dispatch]);
	return (
		<>
			{profile.loading ? (
				<>...LOADING</>
			) : (
				<>
					<h1 className='large text-primary'>Người dùng</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i>tìm kiếm và kết bạn với
						người khác
					</p>
					<div className='profiles'>
						{profile.profiles === null ? (
							<>KHÔNG CÓ PROFILE</>
						) : (
							<>
								{profile.profiles.map((profile) => (
									<ProfileItems key={profile._id} profile={profile} />
								))}
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default Profiles;
