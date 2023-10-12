import './Header.css';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<header className='header-container'>
			{/* 로고 */}
			<div className="logo">
				<Link to="/home">
					<img	src="./img/logo.png"	alt="로고"/>
				</Link>
			</div>

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
					<li> <NavLink to="/login">로그인</NavLink></li>
					<li> <NavLink to="/signup">회원가입</NavLink></li>
				</ul>
			</div>

			{/* 검색창 */}
			<div className='searchBox'>
				<input type="text" />
				<Link to="/searchPage"><img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"/></Link>
			</div>
    </header>
	)
}
