import React from 'react';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slide.css';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// const slides = [
//   /* 이미지 src */
//   'https://eventusstorage.blob.core.windows.net/evs/Image/nightmarket/71569/ProjectInfo/Cover/ee418a8afba7404c8d06e8e41ceea8b1.jpg',
//   'https://eventusstorage.blob.core.windows.net/evs/Image/sistertable/71296/ProjectInfo/Cover/e0f2eb6434244ab98c886520d8a108ee.png',
//   'https://eventusstorage.blob.core.windows.net/evs/Image/studiocheucheu/71357/ProjectInfo/Cover/cd1d757c6fdf4328862cec61d6a3b0a4.jpg',
//   '/img/CarouselTest/slide1.jpg',
//   '/img/CarouselTest/slide2.jpg',
// ];

export default function Slide() {
  const navigate = useNavigate();

  const { projects } = useProjectsApi();
  const {
    isLoading,
    error,
    data: allProjects,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projects.getProjects(),
  });

  if (!Array.isArray(allProjects) || !allProjects.length) {
    return <p>❄️❄️</p>;
  }

  const filteredProjects = allProjects.filter((proj) => {
    const today = new Date();
    const fundStartDate = new Date(proj.projFundDate[0].projFundStartDate);
    const fundEndDate = new Date(proj.projFundDate[0].projFundEndDate);

    fundStartDate.setHours(0, 0, 0, 0);
    fundEndDate.setHours(23, 59, 59, 0);

    return (
      proj.projStatus === '1' && fundStartDate <= today && today <= fundEndDate
    );
  });

  filteredProjects.sort((a, b) => {
    const aFundStartDate = new Date(a.projFundDate[0].projFundStartDate);
    const bFundStartDate = new Date(b.projFundDate[0].projFundStartDate);
    const res = bFundStartDate - aFundStartDate;
    // console.log(
    //   `Slide::sort ret: ${res}, a:${aFundStartDate}, b:${bFundStartDate}`
    // );
    return res;
  });

  if (!Array.isArray(filteredProjects) || !filteredProjects.length) {
    return <p>❄️</p>;
  }

  const slides = filteredProjects.slice(0, 5);
  // console.log('slides count: ', slides.length);
  // slides.forEach((proj) =>
  //   console.log(`${proj.proj_id} => ${proj.projFundDate[0].projFundStartDate}`)
  // );

  const toProjectPage = (proj_id) => {
    navigate('/home/project2', { state: { _id: proj_id } });
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
        {slides.map((proj) => (
          <img
            key={proj.proj_id}
            className='silde-img'
            src={proj.projMainImgPath}
            onClick={() => {
              toProjectPage(proj.proj_id);
            }}
            alt={proj.projName}
          />
        ))}
      </Slider>
    </div>
  );
}

const Arrow = styled.p`
  position: absolute;
  transform: translateY(-50%);
  width: 100px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 1; // 화살표를 이미지 위로
  opacity: 0; // 화면에서 숨김
`;
