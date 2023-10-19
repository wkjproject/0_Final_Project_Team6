import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Endpoint from '../../../config/Endpoint';

export const Logout = () => {
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const token = localStorage.getItem('x_auth');
  const handleLogoutClick = () => {
    axios.get(`${endpoint}/logout`, {
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