import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducer/auth";
import { Link, Redirect } from "react-router-dom";
import { loadUser } from "../../reducer/auth";
import setAuthToken from "../../utils/setAuthToken";

function Login() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const [account, setAccount] = useState({
		email: "",
		password: "",
	});
	const { email, password } = account;
	const onChange = (e) => {
		setAccount({ ...account, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(login({ email, password }));
		setAuthToken(localStorage.token);
		await dispatch(loadUser());
	};
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<div className='container'>
			<section class='container'>
				<h1 class='large text-primary'>Đăng nhập</h1>
				<p class='lead'>
					<i class='fas fa-user'></i> đăng nhập vào tài khoản của bạn
				</p>
				<form
					class='form'
					action='dashboard.html'
					onSubmit={(e) => onSubmit(e)}>
					<div class='form-group'>
						<input
							type='email'
							placeholder='Địa chỉ email'
							name='email'
							value={email}
							required
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div class='form-group'>
						<input
							type='password'
							placeholder='mật khẩu'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<input type='submit' class='btn btn-primary' value='đăng nhập' />
				</form>
				<p class='my-1'>
					Bạn chưa có tài khoản?
					<Link to='/register'> Đăng ký</Link>
				</p>
			</section>
		</div>
	);
}

export default Login;
