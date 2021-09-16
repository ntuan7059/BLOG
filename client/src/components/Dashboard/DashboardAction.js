import React from "react";
import { Link } from "react-router-dom";

function DashboardAction() {
	return (
		<div>
			<div class='dash-buttons'>
				<Link to='/edit-profile' class='btn btn-light'>
					<i class='fas fa-user-circle text-primary'></i> Cập nhập Profile
				</Link>
				<Link to='/add-experience' class='btn btn-light'>
					<i class='fab fa-black-tie text-primary'></i> Kinh nghiệm làm việc
				</Link>
				<Link to='/add-education' class='btn btn-light'>
					<i class='fas fa-graduation-cap text-primary'></i> Trình độ học vấn
				</Link>
			</div>
		</div>
	);
}

export default DashboardAction;
