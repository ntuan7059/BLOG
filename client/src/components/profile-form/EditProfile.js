import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../reducer/profile";
import setAuthToken from "../../utils/setAuthToken";
import { useHistory } from "react-router-dom";

function EditProfile() {
	let history = useHistory();
	const profile = useSelector((state) => state.profile.profile);
	const dispatch = useDispatch();
	const [display, setDisplay] = useState(false);
	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		bio: "",
		twitter: " ",
		facebook: " ",
		linkein: " ",
		youtube: " ",
		instagram: " ",
	});

	const {
		company,
		website,
		location,
		status,
		skills,
		bio,
		twitter,
		facebook,
		linkein,
		youtube,
		instagram,
	} = formData;
	useEffect(() => {
		setFormData({
			company: profile.user.company ? "" : profile.company,
			website: profile.user.website ? "" : profile.website,
			location: profile.user.location ? "" : profile.location,
			status: profile.user.status ? "" : profile.status,
			skills: profile.skills ? "" : profile.skills.join(","),
			bio: profile.bio ? "" : profile.bio,
			/*twitter: profile.social.twitter ? "" : profile.social.twitter,
			facebook: profile.social.facebook ? "" : profile.social.facebook,
			linkein: profile.social.linkein ? "" : profile.social.linkein,
			youtube: profile.social.youtube ? "" : profile.social.youtube,
			instagram: profile.social.instagram ? "" : profile.social.instagram,*/
		});
	}, [
		profile.user.company,
		profile.user.website,
		profile.user.location,
		profile.user.status,
		profile.company,
		profile.website,
		profile.location,
		profile.status,
		profile.skills,
		profile.bio,
	]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setAuthToken(localStorage.token);
		dispatch(
			updateProfile({
				company,
				website,
				location,
				status,
				skills,
				bio,
				twitter,
				facebook,
				linkein,
				youtube,
				instagram,
			})
		);
		history.push("/dashboard");
	};
	return (
		<div>
			<section className='container'>
				<h1 className='large text-primary'>|Cập nhật profile của bạn</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Hãy điền thông tin để profile của bạn
					nổi bật hơn
				</p>
				<small>* : thông tin bắt buộc</small>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<select name='status' value={status} onChange={(e) => onChange(e)}>
							<option value='0'>* Lựa chọn lĩnh vực bạn đang làm</option>
							<option value='Kiến trúc sư'>Kiến trúc sư</option>
							<option value='Lập trình viên'>Lập trình viên</option>
							<option value='Kinh doanh'>Kinh doanh</option>
							<option value='Quản lý'>Quản lý</option>
							<option value='Nghệ nhân'>Nghệ nhân</option>
							<option value='Giáo viên'>Giáo viên</option>
							<option value='Sinh viên-học sinh'>Sinh viên-học sinh</option>
							<option value='Khác'>Khác</option>
						</select>
						<small className='form-text'>
							Hãy cho mọi người biết bạn đang làm ở lĩnh vực nào nhé
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Tên công ty'
							name='company'
							onChange={(e) => onChange(e)}
							value={company}
						/>
						<small className='form-text'>
							Có thể là công ty bạn đang làm hoặc công ty của riêng bạn
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Trang web'
							name='website'
							value={website}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text'>
							Có thể là trang web của riêng bạn hoặc của công ty
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='vị trí'
							name='location'
							value={location}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text'>
							Khu vực mà bạn đang sinh sống và làm việc (ví dụ: Hà Nội)
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* Kỹ năng'
							name='skills'
							value={skills}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text'>
							sử dụng dấu phẩy nếu bạn liệt kê (eg. Tiếng Anh, Marketing,...)
						</small>
					</div>
					<div className='form-group'>
						<textarea
							placeholder='1 chút về lý lịch'
							name='bio'
							onChange={(e) => onChange(e)}
							value={bio}></textarea>
						<small className='form-text'>
							Hãy cho mọi người biết một chút về bạn
						</small>
					</div>

					<div className='my-2'>
						<button
							type='button'
							onClick={(e) => setDisplay(!display)}
							className='btn btn-light'>
							Ấn vào đây
						</button>
						<span>Tùy chọn</span>
					</div>
					{display ? (
						<>
							<div className='form-group social-input'>
								<i className='fab fa-twitter fa-2x'></i>
								<input
									type='text'
									placeholder='Twitter Link'
									name='twitter'
									value={twitter}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className='form-group social-input'>
								<i className='fab fa-facebook fa-2x'></i>
								<input
									type='text'
									placeholder='Facebook Link'
									name='facebook'
									value={facebook}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className='form-group social-input'>
								<i className='fab fa-youtube fa-2x'></i>
								<input
									type='text'
									placeholder='YouTube Link'
									name='youtube'
									value={youtube}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className='form-group social-input'>
								<i className='fab fa-linkedin fa-2x'></i>
								<input
									type='text'
									placeholder='Linkedin Link'
									name='linkedin'
									value={linkein}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<div className='form-group social-input'>
								<i className='fab fa-instagram fa-2x'></i>
								<input
									type='text'
									placeholder='Instagram Link'
									name='instagram'
									value={instagram}
									onChange={(e) => onChange(e)}
								/>
							</div>
						</>
					) : (
						<p>Hãy cập nhật facebook nhé!</p>
					)}
					<input type='submit' className='btn btn-primary my-1' />
					<Link className='btn btn-light my-1' to='/dashboard'>
						Trở lại
					</Link>
				</form>
			</section>
		</div>
	);
}

export default EditProfile;
