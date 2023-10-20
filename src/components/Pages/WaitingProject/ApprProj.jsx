// 승인대기 프로젝트 --> 승인하기 or 거절하기 선택가능 컴포넌트

import React, { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom'; // 추가된 import
// import './RewardSelect.css'

export default function ApprProj() {
	// React Router의 useLocation 훅을 사용하여 현재 위치 가져오기
	const location = useLocation();
	const { _id } = location.state || {};

  const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects");	// API를 사용하여 프로젝트 데이터 가져오기
  const { projName, projPlace, projAddr, projDate } = selectedProject;		 // 프로젝트 정보 추출
  const selectedProject = projectData.find(item => item.proj_id === _id);  // 선택한 프로젝트 찾기

	// useRef로 배경 영역의 참조 생성
  const backgroundAreaRef = useRef(null);
	const navigate = useNavigate();	// 뒤로가기

	const ApproveProj = () => {
		// 프로젝트 승인: '승인하기'를 누르면 : projStatus가 0 --> 1
	}

	const RejectProj = () => {
		// 프로젝트 반려: '반려하기'를 누르면 : projStatus가 0 --> 3
	}

	return (
		<div className='backgroundArea' ref={backgroundAreaRef}>
      <div className='info'>
        <div className='projName'>
          {projName}
          <br />
        </div>
        <div className='projAddr'>
          {projAddr}
          <br />
        </div>
        <div className='projPlace'>
          {projPlace}
          <br />
        </div>

        <div className='projDate'>{/* 맵 함수는 배열 구조의 데이터를 한줄씩 출력 */}
          {projDate.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
          <br />
        </div>
      </div>

			{/* 프로젝트 승인, 반려, 보류 버튼 */}
      <div className='button-container'>
        <button className='apprBtn' onClick={() => ApproveProj()}>프로젝트 승인</button>
				<button className='rejectBtn' onClick={() => RejectProj()}>프로젝트 반려</button>
        <button className='holdBtn' onClick={() => navigate(-1)}>보류</button>

        </div>

		</div>
	)
}