import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './LandingPage.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPerson } from "@fortawesome/free-solid-svg-icons";
import TopBtn from './../TopBtn/TopBtn';

const Background = styled.div`
  height: 100%;
  width: 100%;
`;

export default function LandingPage() {
  const navigate = useNavigate();

  const serviceDesc = [
    {
      image: "./img/user-solid.png",
      title: "혼자하기",
      text: "최소 필요 인원 및 비용 문제 발생",
    },
    {
      image: "./img/comments-dollar-solid.png",
      title: "모금하기",
      text: "이웃과 함께 같은 목적으로  모금",
    },
    {
      image: "./img/people-line-solid.png",
      title: "함께하기",
      text: "저렴한 가격으로 group 구성 성공!",
    }
  ];

  return (
    <Background>
      <TopBtn />
      <div className='landing-container'>
        {/* 1. Intro */}
        <div className='intro'>
          <div className='intro-text-section'>
            <p className='primary-heading'>
              <b>W</b>HO WANT? <br />
              <b>W</b>E WANT!
            </p>
            <p className='primary-text'>뭔가...   문구.....</p>
          </div>
          <div className='intro-image-section'>
            <img src='./img/landing_image.png' alt='자전거 탄 소년' />
            <button className='go-button' onClick={() => navigate('/home')}>함께하기</button>
          </div>
        </div>

        {/* 2. About Us */}
        <div className='about'>
          <div className='about-image-section'>
            <img src='./img/landing_mockUp2.png' alt='랜딩목업' />
          </div>
          <div className='about-text-section'>
            <p className='sub-text'>W & W란?</p>
            <h1 className='primary-heading'>WW서비스는 후원과 펀딩 <br /> 그 어딘가...입니다.</h1>
            <p className='primary-text'>혼자 꿈꾸던 취미를 이웃과 이뤄가세요.<br />추가로 설명이 더 필요합니다.</p>
            <div className='about-button'>
              <button className='about-button' onClick={() => navigate('/home')}>더 알아보기</button>
            </div>
          </div>
        </div>
        {/* 3. Service DESC */}
        <div className='service'>
          <div className='service-section-top'>
            <p className='sub-text'>서비스 소개</p>
            <h1 className='primary-heading'>펀딩은 이렇게 진행되요.</h1>
            <p className='primary-text'>이렇게 해서 저렇게 <br /> Lorem Ipsum is simply dummy text<br />  of the printing and typesettingm</p>
          </div>
          <div className='service-section-bottom'>
            {serviceDesc.map((data) => (
              <div className='service-info'>
                <div className='service-info-img'>
                  <img src={data.image} alt="서비스 이미지" height={'60px'} />
                </div>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
}
