import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SET_ALERT, REMOVE_ALERT } from "../../reducer/alert";
import { nanoid } from "@reduxjs/toolkit";
import { register } from "../../reducer/auth";

function Register() {
	const id = nanoid();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = state;
	const onChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			dispatch(
				SET_ALERT({
					msg: "mật khẩu không trùng",
					alerType: "danger",
					id: id,
				})
			);
			setTimeout(() => dispatch(REMOVE_ALERT({ id })), 5000);
		} else {
			dispatch(register({ name, email, password }));
		}
	};

	return (
		<div>
			<h1 class='large text-primary'>Đăng Ký</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Tạo tài khoản
			</p>
			<form class='form' onSubmit={(e) => onSubmit(e)}>
				<div class='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						value={email}
						name='email'
						onChange={(e) => onChange(e)}
						required
					/>
					<small class='form-text'>
						Ảnh đại diện sẽ được lấy từ tài khoản email Gravatar của bạn
					</small>
				</div>
				<div class='form-group'>
					<input
						type='password'
						placeholder='Mật khẩu'
						name='password'
						minLength='6'
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='password'
						placeholder='Nhập lại mật khẩu'
						name='password2'
						minLength='6'
						password2={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type='submit' class='btn btn-primary' value='Register' />
			</form>
			<p class='my-1'>
				Bạn có tài khoản rồi? <a href='login.html'>Đăng nhập</a>
			</p>
		</div>
	);
}

export default Register;
