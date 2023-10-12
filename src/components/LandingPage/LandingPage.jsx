import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import './LandingPage.css';

const Background = styled.div`
  background-image: url('./img/landing_bg.png');
  background-size: cover;
  background-repeat: no-repeat; /* 배경 이미지 반복 금지 */

	border-top: 0.5px solid #cecccd;
  height: 100vh;
  width: 100vw;
`;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Background>
      <div className='landing-container'>
        <div className='text-section'>
          <p className='primary-heading'>
            <b>W</b>HO WANT? <br />
            <b>W</b>E WANT!
          </p>
          <p className='primary-text'>뭔가...   문구.....</p>
        </div>
        <div className='image-section'>
          <img src='./img/landing_image.png' alt='자전거 탄 소년' />
          <button className='button' onClick={()=> navigate('/home')}>함께하기</button>
        </div>
      </div>
    </Background>
  );
}
