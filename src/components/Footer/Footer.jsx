import React from 'react';
import './Footer.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer>
			<hr></hr>
      <div className="footer-container">
        <div className='footer-padding'>
					<div className='footer-links-container'>
					<div className="footer-link">
							<h4>공지사항</h4>
							<a href="#"><p>문의사항</p></a>
							<a href="#"><p>게시판</p></a>
							<a href="#"><p>Q&A</p></a>
						</div>
						<div className="footer-link">
							<h4>서비스 소개</h4>
							<a href="#"><p>WW란?</p></a>
							<a href="#"><p>프로그램 제작 가이드</p></a>
							<a href="#"><p>프로그램 참여 메뉴얼</p></a>
						</div>
						<div className="footer-link">
							<h4>이용약관</h4>
							<a href="#"><p>서비스 이용약관</p></a>
							<a href="#"><p>개인정보처리방침</p></a>
							<a href="#"><p>취소 및 환불약관</p></a>
						</div>
						<div className="footer-link">
							<h4>회사 소개</h4>
							<a href="#"><p>☎: 012-345-6789</p></a>
							<a href="#"><p>Email: WW123@google.com </p></a>
							<a href="#"><p>서울특별시 중구 세종대로 110</p></a>
						</div>		
						<div className="footer-link"></div>
						<div className="footer-link"></div>							
					</div>

					<hr></hr>

					<div className='footer-below'>
						<div className='footer-below-copyright'>
							<p>Copyright ⓒ2023 WW Coporation. All right reserved.</p>
						</div>
						<div className='footer-below-links'>
							<p>Contact Us</p>
							<div className='sns-link'>
								<a href="/"><p><img src='/img/facebook.png' alt="페이스북" /></p></a>
								<a href="/"><p><img src='/img/twitter.png' alt="트위터" /></p></a>
								<a href="/"><p><img src='/img/instagram.png' alt="인스타그램" /></p></a>
							</div>
						</div>
					</div>
				</div>
      </div>
    </footer>
  );
}

export default Footer;
