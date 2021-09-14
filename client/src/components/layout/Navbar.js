import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../reducer/auth";

const authLink = (
	<ul>
		<li>
			<Link to='#' onClick={logout}>
				<i className='fas fa-sign-out-alt'></i>
				<span className='hide-sm'> Đăng xuất</span>
			</Link>
		</li>
	</ul>
);

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
	return (
		<nav className='navbar bg-dark'>
			<Link to='/' className='special'>
				<h1>
					<i className='fas fa-blog'></i> BlogForUser
				</h1>
				<>{state.isAuthenticated ? authLink : guestLink}</>
			</Link>
		</nav>
	);
}

export default Navbar;
