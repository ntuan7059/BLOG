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
				<h1 className='large text-primary'>|C???p nh???t profile c???a b???n</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> H??y ??i???n th??ng tin ????? profile c???a b???n
					n???i b???t h??n
				</p>
				<small>* : th??ng tin b???t bu???c</small>
				<form className='form' onSubmit={(e) => onSubmit(e)}>
					<div className='form-group'>
						<select name='status' value={status} onChange={(e) => onChange(e)}>
							<option value='0'>* L???a ch???n l??nh v???c b???n ??ang l??m</option>
							<option value='Ki???n tr??c s??'>Ki???n tr??c s??</option>
							<option value='L???p tr??nh vi??n'>L???p tr??nh vi??n</option>
							<option value='Kinh doanh'>Kinh doanh</option>
							<option value='Qu???n l??'>Qu???n l??</option>
							<option value='Ngh??? nh??n'>Ngh??? nh??n</option>
							<option value='Gi??o vi??n'>Gi??o vi??n</option>
							<option value='Sinh vi??n-h???c sinh'>Sinh vi??n-h???c sinh</option>
							<option value='Kh??c'>Kh??c</option>
						</select>
						<small className='form-text'>
							H??y cho m???i ng?????i bi???t b???n ??ang l??m ??? l??nh v???c n??o nh??
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='T??n c??ng ty'
							name='company'
							onChange={(e) => onChange(e)}
							value={company}
						/>
						<small className='form-text'>
							C?? th??? l?? c??ng ty b???n ??ang l??m ho???c c??ng ty c???a ri??ng b???n
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
							C?? th??? l?? trang web c???a ri??ng b???n ho???c c???a c??ng ty
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='v??? tr??'
							name='location'
							value={location}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text'>
							Khu v???c m?? b???n ??ang sinh s???ng v?? l??m vi???c (v?? d???: H?? N???i)
						</small>
					</div>
					<div className='form-group'>
						<input
							type='text'
							placeholder='* K??? n??ng'
							name='skills'
							value={skills}
							onChange={(e) => onChange(e)}
						/>
						<small className='form-text'>
							s??? d???ng d???u ph???y n???u b???n li???t k?? (eg. Ti???ng Anh, Marketing,...)
						</small>
					</div>
					<div className='form-group'>
						<textarea
							placeholder='1 ch??t v??? l?? l???ch'
							name='bio'
							onChange={(e) => onChange(e)}
							value={bio}></textarea>
						<small className='form-text'>
							H??y cho m???i ng?????i bi???t m???t ch??t v??? b???n
						</small>
					</div>

					<div className='my-2'>
						<button
							type='button'
							onClick={(e) => setDisplay(!display)}
							className='btn btn-light'>
							???n v??o ????y
						</button>
						<span>T??y ch???n</span>
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
						<p>H??y c???p nh???t facebook nh??!</p>
					)}
					<input type='submit' className='btn btn-primary my-1' />
					<Link className='btn btn-light my-1' to='/dashboard'>
						Tr??? l???i
					</Link>
				</form>
			</section>
		</div>
	);
}

export default EditProfile;
