import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEdu, getCurrentUser } from "../../reducer/profile";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AddEdu() {
	let history = useHistory();
	const dispatch = useDispatch();
	const [edu, setEdu] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});
	const { school, degree, fieldofstudy, from, to, current, description } = edu;
	const onChange = (e) => {
		e.preventDefault();
		setEdu({ ...edu, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(addEdu(edu));
		history.push("/dashboard");
	};
	return (
		<div>
			<section class='container'>
				<h1 class='large text-primary'>Thêm trình độ học vấn</h1>
				<p class='lead'>
					<i class='fas fa-graduation-cap'></i> Thêm trường bạn đã học
				</p>
				<small>* : mục bắt buộc</small>
				<form class='form' onSubmit={(e) => onSubmit(e)}>
					<div class='form-group'>
						<input
							type='text'
							placeholder='* Trường học'
							name='school'
							value={school}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div class='form-group'>
						<input
							type='text'
							placeholder='* Bằng cấp'
							name='degree'
							value={degree}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div class='form-group'>
						<input
							type='text'
							placeholder='Ngành học'
							name='fieldofstudy'
							value={fieldofstudy}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div class='form-group'>
						<h4>Từ ngày</h4>
						<input
							type='date'
							name='from'
							value={from}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div class='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								value={current}
								onChange={(e) => {
									setEdu({ ...edu, current: !current });
								}}
							/>{" "}
							Trường đang học
						</p>
					</div>
					<div class='form-group'>
						<h4>Đến ngày</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div class='form-group'>
						<textarea
							name='description'
							cols='30'
							rows='5'
							placeholder='Thêm mô tả'
							value={description}
							onChange={(e) => onChange(e)}></textarea>
					</div>
					<input type='submit' class='btn btn-primary my-1' />
					<Link class='btn btn-light my-1' to='/dashboard'>
						Trở lại
					</Link>
				</form>
			</section>
		</div>
	);
}

export default AddEdu;
