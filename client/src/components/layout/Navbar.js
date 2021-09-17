import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../reducer/auth";

const guestLink = (
	<ul>
		<li>
			<Link to='/'>Người dùng</Link>
		</li>
		<li>
			<Link to='/register'>đăng ký</Link>
		</li>
		<li>
			<Link to='/login'>đăng nhập</Link>
		</li>
	</ul>
);
function Navbar() {
	const state = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	function refreshPage() {
		window.location.reload();
	}
	return (
		<nav className='navbar bg-dark'>
			<Link to='/' className='special'>
				<h1>
					<i className='fas fa-blog'></i> BlogForUser
				</h1>
				<>
					{state.isAuthenticated ? (
						<>
							<ul>
								<li>
									<Link to='/dashboard'>
										<i className='fas fa-user'></i>
										<span className='hide-sm'> Dashboard</span>
									</Link>
								</li>
								<li>
									<Link
										to='#'
										onClick={(e) => {
											refreshPage();
											dispatch(logout());
										}}>
										<i className='fas fa-sign-out-alt'></i>
										<span className='hide-sm'> Đăng xuất</span>
									</Link>
								</li>
							</ul>
						</>
					) : (
						guestLink
					)}
				</>
			</Link>
		</nav>
	);
}

export default Navbar;
