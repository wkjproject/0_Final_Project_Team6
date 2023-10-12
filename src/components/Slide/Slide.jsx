import React from 'react';
import styled from 'styled-components';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";

const slides = [ /* 이미지 src */
	'https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg',
	'https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg',
	'./img/CarouselTest/slide1.jpg',
	'./img/CarouselTest/slide2.jpg',
	'./img/CarouselTest/slide3.jpg',
]

export default function Slide() {

	const toProjectPage = () => {
    /*슬라이드 이미지를 클릭하면 상세페이지로*/
  };

	// 슬라이더 설정
  const settings = {
    dots: true,
    nextArrow: <Arrow />,
		prevArrow: <Arrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

	return (
		<div className='slide-container'>
			<Slider {...settings}>
				{slides.map((_src) => (
					<img src = {_src} onClick={toProjectPage}/>
				))}
			</Slider>
		</div>
	)
}

const Arrow = styled.p`  
	position: absolute;
	transform: translateY(-50%);
	width: 100px;
	height: 100%;
	cursor: pointer;
	transition: all 0.3s;
	z-index: 1; // 화살표를 이미지 위로
	opacity: 0;	// 화면에서 숨김
`;
