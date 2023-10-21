import './Header.css';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Logout } from '../Pages/MemberService/Logout';

export default function Header() {
	// 리덕스에서 로그인 상태 확인
	const isLogin = useSelector((state) => state.auth.auth.isLogin);
	// 리덕스에서 운영자 확인
	const isAdmin = useSelector((state) => state.auth.auth.isAdmin);

	return (
		<header className='header-container'>
			{/* 로고 */}
			<div className="logo">
				<Link to="/home">
					<img src="./img/logo.png" alt="로고" />
				</Link>
			</div>
			<hr />

			{/* 네비게이션 바 */}
			<div className='navbar'>
				<ul>
					<li> <NavLink to="/openProj">오픈예정</NavLink></li>
					<li> <NavLink to="/newProj">신규 프로젝트</NavLink></li>
					<li> <NavLink to="/deadlineProj">마감임박</NavLink></li>
				</ul>
			</div>

			{/* 회원가입 & 로그인 */}
			<div className='login-signup'>
				<ul>
					{isLogin ? (
						isAdmin ? (
							// 관리자로 로그인한 경우
							<>
							<button> <NavLink to="/">프로젝트 관리</NavLink></button>
							<li> <NavLink to="/">회원관리</NavLink></li>
							<Logout />
							</>
						) : (
							// 일반 사용자로 로그인한 경우
							<>
							<button> <NavLink to="/createProj">프로젝트 만들기</NavLink></button>
							<li> <NavLink to="/mypage">마이페이지</NavLink></li>
							<Logout />
							</>
						)
					) : (
						// 로그인하지 않은 경우
						<>
							<li> <NavLink to="/login">로그인</NavLink></li>
							<li> <NavLink to="/signup">회원가입</NavLink></li>
						</>
					)}
				</ul>
			</div>

			{/* 검색창 */}
			<div className='searchBox'>
				<input type="text" />
				<Link to="/searchPage"><img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt='' /></Link>
			</div>
			<hr />

		</header>
	)
}
