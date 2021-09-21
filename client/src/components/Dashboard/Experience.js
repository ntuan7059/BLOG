import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { deleteExp } from "../../reducer/profile";
import { useDispatch } from "react-redux";

function Experience() {
	const dispatch = useDispatch();
	const experience = useSelector((state) => state.profile.profile.experience);
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				<Moment format='YYYY/MM/DD'>{exp.from}</Moment>-{" "}
				{exp.to === "" ? (
					"Hiện tại"
				) : (
					<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={(e) => dispatch(deleteExp(exp._id))}
					className='btn btn-danger'>
					Xóa
				</button>
			</td>
		</tr>
	));
	return (
		<div>
			<h2 className='my-2'>Kinh nghiệm làm việc</h2>
			<table className='table'>
				<thead>
					<td className='exp'>Công ty</td>
					<td className='hide-sm exp'>Công việc</td>
					<td className='hide-sm exp'>Thời gian</td>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</div>
	);
}

export default Experience;
