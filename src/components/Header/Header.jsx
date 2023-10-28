import './Header.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Logout } from '../Pages/MemberService/Logout';
import { BsSearch } from 'react-icons/bs';
import { useEffect } from 'react';

export default function Header() {
  // 리덕스에서 로그인 상태 확인
  const isLogin = useSelector((state) => state.auth.auth.isLogin);
  // 리덕스에서 운영자 확인
  const isAdmin = useSelector((state) => state.auth.auth.isAdmin);

  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/home/searchPage/${text}`);
    setText('');
    //navigate('/waitingProj', { state: { _id: props.projId } });
  };

  useEffect(() => {
    console.log('Header: ', keyword);
    setText(keyword || '');
  }, [keyword]);

  return (
    <header className='header-container'>
      {/* 로고 */}
      <div className='logo'>
        <Link to='/home'>
          <img src='/img/logo.png' alt='로고' />
        </Link>
      </div>

      {/* 네비게이션 바 */}
      <div className='navbar'>
        <ul>
          <li>
            {' '}
            <NavLink to='/home/openProj'>오픈예정</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to='/home/newProj'>신규 프로젝트</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to='/home/deadlineProj'>마감임박</NavLink>
          </li>
        </ul>
      </div>

      {/* 회원가입 & 로그인 */}
      <div className='login-signup'>
        <ul>
          {isLogin ? (
            isAdmin ? (
              // 관리자로 로그인한 경우
              <>
                <button className='navButton'>
                  {' '}
                  <NavLink to='/manageProj'>프로젝트 관리</NavLink>
                </button>
                <li>
                  {' '}
                  <NavLink to='/manageUsers'>회원관리</NavLink>
                </li>
                <Logout />
              </>
            ) : (
              // 일반 사용자로 로그인한 경우
              <>
                <button className='navButton'>
                  {' '}
                  <NavLink to='/createProj'>프로젝트 만들기</NavLink>
                </button>
                <li>
                  {' '}
                  <NavLink to='/mypage'>마이페이지</NavLink>
                </li>
                <Logout />
              </>
            )
          ) : (
            // 로그인하지 않은 경우
            <>
              <li>
                {' '}
                <NavLink to='/login'>로그인</NavLink>
              </li>
              <li>
                {' '}
                <NavLink to='/signup'>회원가입</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* 검색창 */}
      <div className='searchBox'>
        <form action='' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <img
            src='https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png'
            alt=''
            onClick={handleSubmit}
          />
        </form>
      </div>
    </header>
  );
}
