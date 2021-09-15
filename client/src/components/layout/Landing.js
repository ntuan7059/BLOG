import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	} else
		return (
			<section className='landing'>
				<div className='dark-overlay'>
					<div className='landing-inner'>
						<h1 className='x-large'>Blog For User</h1>
						<p className='lead'>
							Blog dành cho người dùng, là nơi chia sẻ kinh nghiệm, kết bạn.{" "}
							<br />
							{
								"Nếu bạn chưa là thành viên, xin hãy đăng ký để xem nội dụng được chia sẻ. "
							}
						</p>
						<div className='buttons'>
							<Link to='/register' className='btn btn-primary'>
								Đăng Ký
							</Link>
						</div>
					</div>
				</div>
			</section>
		);
}

export default Landing;
