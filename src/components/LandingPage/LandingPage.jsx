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
      image: './img/user-solid.png',
      title: '혼자하기',
      text: '최소 필요 인원 및 비용 문제 발생',
    },
    {
      image: './img/comments-dollar-solid.png',
      title: '모금하기',
      text: '이웃과 함께 같은 목적으로  모금',
    },
    {
      image: './img/people-line-solid.png',
      title: '함께하기',
      text: '저렴한 가격으로 Group 구성 성공!',
    },
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
            <p className='primary-text'>
              다양한 우리가 모여 함께 더 즐거운 일상을 만듭니다.
            </p>
          </div>
          <div className='intro-image-section'>
            <img src='./img/landing_image.png' alt='자전거 탄 소년' />
            <button className='go-button' onClick={() => navigate('/home')}>
              함께하기
            </button>
          </div>
        </div>

        {/* 2. About */}
        <div className='about'>
          <div className='about-image-section'>
            <img src='./img/landing_mockUp2.png' alt='랜딩목업' />
          </div>
          <div className='about-text-section'>
            <p className='sub-text'>About</p>
            <h1 className='primary-heading'>WW서비스는...</h1>
            <p className='primary-text'>
              단순한 후원과 펀딩으로만 끝나는게 아닌
              <br />
              처음부터 끝까지 함께 하는 동반자적 관계 형성을 통해
              <br />
              지속적인 성장을 기대할 수있는 차세대 클라우드 펀딩사이트입니다.
              <br />
              <br />
              함께 같이의 가치를 찾아 보는건 어떨까요?
            </p>
            <div className='about-button'>
              <button
                className='about-button'
                onClick={() => navigate('/home')}
              >
                더 알아보기
              </button>
            </div>
          </div>
        </div>
        {/* 3. Service DESC */}
        <div className='service'>
          <div className='service-section-top'>
            <p className='sub-text'>서비스 소개</p>
            <h1 className='primary-heading'>펀딩은 이렇게 진행돼요.</h1>
            <p className='primary-text'>
              취향이 모여 세상을 바꾸고  <br />
              그 중심에는 여러분들이 있습니다.  <br /><br />
              현재 일어나고 있는 가장 새롭고 창조적인 시도들을 <br />
              <span className='sub'>WW</span>가 함께 만들어갑니다. <br />

            </p>
          </div>
          <div className='service-section-bottom'>
            {serviceDesc.map((data) => (
              <div className='service-info'>
                <div className='service-info-img'>
                  <img src={data.image} alt='서비스 이미지' height={'60px'} />
                </div>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* 4. Outro */}
        <div className='outro'>
          <p className='primary-text'>
            .<br />.<br />.<br />
            <br />
            <br />
            <br />
            <br />
            인생은 모두가 함께 하는 여행이다.
            <br />
            매일매일 사는 동안 우리가 할 수 있는 건<br />
            최선을 다해 이 멋진 여행을 만끽하는 것이다.
            <br />
            <br />
            Life is a journey that everyone takes together.
            <br />
            What we can do while living every day
            <br />
            Do your best to enjoy this wonderful trip.
            <br />
            <br />
            <br />
            <br />
            <br />
            .<br />.<br />.<br />
          </p>
        </div>
      </div>
    </Background>
  );
}
