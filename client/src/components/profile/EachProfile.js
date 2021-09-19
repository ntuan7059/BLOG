import React from "react";
import Moment from "react-moment";

function EachProfile({
	profile: {
		user,
		bio,
		company,
		education,
		experience,
		status,
		location,
		website,
		social,
		skills,
	},
}) {
	return (
		<div>
			<div className='profile-grid my-1'>
				<div className='profile-top bg-primary p-2'>
					<img className='round-img my-1' src={user.avatar} alt='' />
					<h1 className='large'>{user.name}</h1>
					<p className='lead'>
						{status} {company ? company : ""}
					</p>
					<p>{location ? location : ""}</p>
					<div className='icons my-1'>
						{website ? (
							<a href={website} target='_blank' rel='noopener noreferrer'>
								<i className='fas fa-globe fa-2x'></i>
							</a>
						) : (
							""
						)}
						{social.twitter ? (
							<a
								href={social.twitter}
								target='_blank'
								rel='noopener noreferrer'>
								<i className='fab fa-twitter fa-2x'></i>
							</a>
						) : (
							""
						)}
						{social.facebook ? (
							<a
								href={social.facebook}
								target='_blank'
								rel='noopener noreferrer'>
								<i className='fab fa-facebook fa-2x'></i>
							</a>
						) : (
							""
						)}
						{social.linkin ? (
							<a href={social.linkin} target='_blank' rel='noopener noreferrer'>
								<i className='fab fa-linkedin fa-2x'></i>
							</a>
						) : (
							""
						)}
						{social.youtube ? (
							<a
								href={social.youtube}
								target='_blank'
								rel='noopener noreferrer'>
								<i className='fab fa-youtube fa-2x'></i>
							</a>
						) : (
							""
						)}
						{social.instagram ? (
							<a
								href={social.instagram}
								target='_blank'
								rel='noopener noreferrer'>
								<i className='fab fa-instagram fa-2x'></i>
							</a>
						) : (
							""
						)}
					</div>
				</div>

				<div className='profile-about bg-light p-2'>
					<h2 className='text-primary'>Sơ yếu lý lịch của {user.name}</h2>
					<p>{bio}</p>
					<div className='line'></div>
					<h2 className='text-primary'>Các kỹ năng</h2>
					<div className='skills'>
						{skills.map((skill) => (
							<div className='p-1'>
								<i className='fa fa-check'></i> {skill}
							</div>
						))}
					</div>
				</div>

				<div className='profile-exp bg-white p-2'>
					<h2 className='text-primary'>Kinh nghiệm làm việc</h2>
					<div>
						{experience ? (
							<>
								{experience.map((experience) => (
									<>
										<h3 className='text-dark'>{experience.company}</h3>
										<Moment format='YYYY/MM/DD'>{experience.to}</Moment>
										<p>
											<strong>Vị trí làm việc: </strong>
											{experience.title}
										</p>
										<p>
											<strong>Mô tả: </strong>
											{experience.description}
										</p>
									</>
								))}
							</>
						) : (
							<>Người dùng chưa thêm kinh nghiệm làm việc</>
						)}
					</div>
				</div>

				<div className='profile-edu bg-white p-2'>
					<h2 className='text-primary'>Trình độ học vấn</h2>
					{education ? (
						education.map((education) => (
							<>
								<h3>{education.school}</h3>
								<Moment format='YYYY/MM/DD'>{experience.to}</Moment>
								<p>
									<strong>Bằng cấp: </strong>
									{education.degree}
								</p>
								<p>
									<strong>Ngành học: </strong>
									{education.fieldofstudy}
								</p>
								<p>
									<strong>Mô tả: </strong>
									{education.description}
								</p>
							</>
						))
					) : (
						<>Người dùng chưa thêm trình độ học vấn</>
					)}
				</div>
			</div>
		</div>
	);
}

export default EachProfile;
