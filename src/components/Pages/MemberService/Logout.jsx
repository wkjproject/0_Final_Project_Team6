import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('x_auth');
  const handleLogoutClick = () => {
    axios.get('http://localhost:5000/logout', {
      headers: {
        authorization: `Bearer ${token}`, // Bearer 스키마를 사용하는 토큰 전달
      },
    }).then(res => {
      if(res.data.logoutSuccess){
        navigate('/home');
        window.location.reload();
      } else {
        navigate('/home');
        window.location.reload();
      }
    })
  }
  return (
    <li onClick={handleLogoutClick}>로그아웃</li>
  )
}