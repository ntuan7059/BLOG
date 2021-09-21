import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getCurrentUser } from "../../reducer/profile";
import DashboardAction from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";
import { useHistory } from "react-router-dom";

function Dashboard() {
	let history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);
	const onChange = async (e) => {
		await dispatch(deleteUser());
		history.push("/login");
	};
	const user = useSelector((state) => state.auth.user);
	const profile = useSelector((state) => state.profile);
	if (user == null) {
		return <div>Loading...</div>;
	} else
		return (
			<div className='container'>
				<h1 className='large text-primary'>Dashboard</h1>
				<p className='lead'>
					<i className='fas fa-user'> Chào mừng {user.name}</i>
				</p>
				{profile.loading ? (
					<>...LOADING</>
				) : profile.profile == null ? (
					<>
						<p>bạn chưa có profile, hãy tạo profile nhé! </p>
						<Link to='/create-profile' className='btn btn-primary my-1'>
							Tạo profile
						</Link>
					</>
				) : (
					<>
						<DashboardAction />
						<Experience />
						<Education />
						<div className='my-2'>
							<button className='btn btn-danger' onClick={(e) => onChange(e)}>
								<i className='fas fa-user-minus'> Xóa tài khoản</i>
							</button>
						</div>
					</>
				)}
			</div>
		);
}

export default Dashboard;
