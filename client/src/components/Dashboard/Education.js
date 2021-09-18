import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { deleteEdu } from "../../reducer/profile";
import { useDispatch } from "react-redux";

function Education() {
	const dispatch = useDispatch();
	const education = useSelector((state) => state.profile.profile.education);
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{edu.from}</Moment>-{" "}
				{edu.to == null ? (
					"Hiện tại"
				) : (
					<Moment format='YYYY/MM/DD'>{edu.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => {
						dispatch(deleteEdu(edu._id));
					}}
					className='btn btn-danger'>
					Xóa
				</button>
			</td>
		</tr>
	));
	return (
		<div>
			<h2 className='my-2'>Hành trình học tập</h2>
			<table className='table'>
				<thead>
					<td className='exp'>Trường</td>
					<td className='hide-sm exp'>Bằng cấp</td>
					<td className='hide-sm exp'>Thời gian</td>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</div>
	);
}

export default Education;
