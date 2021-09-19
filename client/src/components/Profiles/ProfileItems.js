import React from "react";
import { Link } from "react-router-dom";

function ProfileItems({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		skills,
		location,
	},
}) {
	return (
		<div className='profile big-light'>
			<img src={avatar} alt='' className='round-img' />
			<div>
				<h2>{name}</h2>
				<p>
					{status} {company && <span>{company}</span>}
				</p>
				<p className='my-1'>{location && <span>{location}</span>}</p>
				<Link to={`/user/${_id}`} className='btn btn-primary'>
					Thông tin chi tiết
				</Link>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className='text-primary'>
						<i className='fas fa-check'>{skill}</i>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProfileItems;
