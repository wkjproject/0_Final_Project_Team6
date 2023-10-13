import React from 'react';
import styled from 'styled-components';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";

const slides = [ /* 이미지 src */
	'https://eventusstorage.blob.core.windows.net/evs/Image/nightmarket/71569/ProjectInfo/Cover/ee418a8afba7404c8d06e8e41ceea8b1.jpg',
	'https://eventusstorage.blob.core.windows.net/evs/Image/sistertable/71296/ProjectInfo/Cover/e0f2eb6434244ab98c886520d8a108ee.png',
	'https://eventusstorage.blob.core.windows.net/evs/Image/studiocheucheu/71357/ProjectInfo/Cover/cd1d757c6fdf4328862cec61d6a3b0a4.jpg',
  './img/CarouselTest/slide1.jpg',
  './img/CarouselTest/slide2.jpg'
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