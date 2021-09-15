import React, { useState } from "react";
import { Link } from "react-router-dom";

function CreateProfile() {
	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkein: "",
		youtube: "",
		instagram: "",
	});
	return (
		<div>
			<section className='container'>
				<h1 className='large text-primary'>Tạo profile của bạn</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Hãy điền thông tin để profile của bạn
					nổi bật hơn
				</p>
				<small>* : thông tin bắt buộc</small>
				<form className='form'>
					<div className='form-group'>
						<select name='status'>
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
						<input type='text' placeholder='Tên công ty' name='company' />
						<small className='form-text'>
							Có thể là công ty bạn đang làm hoặc công ty của riêng bạn
						</small>
					</div>
					<div className='form-group'>
						<input type='text' placeholder='Trang web' name='website' />
						<small className='form-text'>
							Có thể là trang web của riêng bạn hoặc của công ty
						</small>
					</div>
					<div className='form-group'>
						<input type='text' placeholder='vị trí' name='location' />
						<small className='form-text'>
							Khu vực mà bạn đang sinh sống và làm việc (ví dụ: Hà Nội)
						</small>
					</div>
					<div className='form-group'>
						<input type='text' placeholder='* Kỹ năng' name='skills' />
						<small className='form-text'>
							sử dụng dấu phẩy nếu bạn liệt kê (eg. Tiếng Anh, Marketing,...)
						</small>
					</div>
					<div className='form-group'>
						<textarea placeholder='1 chút về lý lịch' name='bio'></textarea>
						<small className='form-text'>
							Hãy cho mọi người biết một chút về bạn
						</small>
					</div>

					<div className='my-2'>
						<button type='button' className='btn btn-light'>
							Mạng xã hội giúp bạn kết bạn dễ dàng hơn
						</button>
						<span>Tùy chọn</span>
					</div>

					<div className='form-group social-input'>
						<i className='fab fa-twitter fa-2x'></i>
						<input type='text' placeholder='Twitter Link' name='twitter' />
					</div>

					<div className='form-group social-input'>
						<i className='fab fa-facebook fa-2x'></i>
						<input type='text' placeholder='Facebook Link' name='facebook' />
					</div>

					<div className='form-group social-input'>
						<i className='fab fa-youtube fa-2x'></i>
						<input type='text' placeholder='YouTube Link' name='youtube' />
					</div>

					<div className='form-group social-input'>
						<i className='fab fa-linkedin fa-2x'></i>
						<input type='text' placeholder='Linkedin Link' name='linkedin' />
					</div>

					<div className='form-group social-input'>
						<i className='fab fa-instagram fa-2x'></i>
						<input type='text' placeholder='Instagram Link' name='instagram' />
					</div>
					<input type='submit' className='btn btn-primary my-1' />
					<Link className='btn btn-light my-1' to='/dashboard'>
						Trở lại
					</Link>
				</form>
			</section>
		</div>
	);
}

export default CreateProfile;
