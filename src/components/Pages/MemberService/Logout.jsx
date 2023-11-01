import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Endpoint from '../../../config/Endpoint';

export const Logout = () => {
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const _id = useSelector((state) => state._id._id);
  const handleLogoutClick = () => {
    axios.post(`${endpoint}/logout`, {
      _id
    }).then(res => {
      if(res.data.logoutSuccess){
        localStorage.removeItem('x_auth');
        localStorage.removeItem('persist:root');
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