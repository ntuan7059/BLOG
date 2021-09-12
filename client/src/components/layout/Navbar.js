import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className='navbar bg-dark'>
			<Link to='/'>
				<h1>
					<i className='fas fa-blog'></i> BlogForUser
				</h1>
			</Link>
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
		</nav>
	);
}

export default Navbar;
