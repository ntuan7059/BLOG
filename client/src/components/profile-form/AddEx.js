import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExp } from "../../reducer/profile";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function AddExp() {
	let history = useHistory();
	const [display, setDisplay] = useState(true);
	const dispatch = useDispatch();
	const [exp, setExp] = useState({
		title: "",
		company: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});
	const { title, company, location, from, to, current, description } = exp;
	const onChange = (e) => {
		e.preventDefault();
		setExp({ ...exp, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await dispatch(addExp(exp));
		history.push("/dashboard");
	};
	return (
		<div>
			<section class='container'>
				<h1 class='large text-primary'>Thêm kinh nghiệm</h1>
				<p class='lead'>
					<i class='fas fa-code-branch'></i> Công việc bạn từng làm
				</p>
				<small>* : Mục bắt buộc</small>
				<form class='form' onSubmit={(e) => onSubmit(e)}>
					<div class='form-group'>
						<input
							type='text'
							placeholder='* Tên công việc'
							name='title'
							value={title}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div class='form-group'>
						<input
							type='text'
							placeholder='* Nơi làm việc'
							name='company'
							value={company}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
					<div class='form-group'>
						<input
							type='text'
							placeholder='Khu vực'
							name='location'
							onChange={(e) => onChange(e)}
							value={location}
						/>
					</div>
					<div class='form-group'>
						<h4>Từ</h4>
						<input
							type='date'
							name='from'
							value={from}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<div class='form-group'>
						<p>
							<input
								type='checkbox'
								name='current'
								value={current}
								onChange={(e) => {
									setExp({ ...exp, current: !current });
									setDisplay(!display);
								}}
							/>{" "}
							Hiện tại đang làm
						</p>
					</div>
					<div class='form-group'>
						<h4>Đến</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={(e) => onChange(e)}
							disabled={display ? "" : "display"}
						/>
					</div>
					<div class='form-group'>
						<textarea
							name='description'
							cols='30'
							rows='5'
							placeholder='Mô tả'
							onChange={(e) => onChange(e)}
							value={description}></textarea>
					</div>
					<input type='submit' class='btn btn-primary my-1' />
					<Link class='btn btn-light my-1' to='/dashboard'>
						Quay lại
					</Link>
				</form>
			</section>
		</div>
	);
}

export default AddExp;
