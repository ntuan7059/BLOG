import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../reducer/profile";

function Dashboard() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);
	const user = useSelector((state) => state.user.user);
	const profile = useSelector((state) => state.profile.profile);
	return (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'> Chào mừng {user.name}</i>
			</p>
			{!profile == [] ? (
				<>có</>
			) : (
				<>
					<p>bạn chưa có profile, hãy tạo profile nhé! </p>
					<Link to='/creat-profile' className='btn btn-primary my-1'>
						Tạo profile
					</Link>
				</>
			)}
		</>
	);
}

export default Dashboard;
