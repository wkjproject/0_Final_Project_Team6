// 승인대기 프로젝트 상세화면:서비스 관리자만 출입가능(프로젝트를 승인/반려하는 페이지)
// '승인하기'를 누르면 : projStatus가 0 --> 1 (오픈예정 프로젝트로 등록)

import React from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';  // 리덕스 액션쪽으로 데이터 보내기

import ApprProj from './ApprProj';
import MenuTabs from '../../MenuTabs';

export default function WaitingProj() {
  const location = useLocation();
  const { _id } = location.state || {};

  const projectData = useFetch(
    'https://json-server-vercel-sepia-omega.vercel.app/projects'
  );

  if (!projectData) {
    return <div>Loading...</div>;
  }

  // "proj_id" 값을 기반으로 해당 "projName"을 찾기
  const selectedProject = projectData.find((item) => item.proj_id === _id);

  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  const { projName, projMainImgPath, projIntro } = selectedProject;

  return (
    <div>
      <h1 className='titlealign'>{projName}</h1>
      <div className='center'>
        <div>
          <div>
            <img
              className='mainImage'
              src={projMainImgPath}
              alt='메인 사진'
            ></img>
          </div>
          <div className='shortDesc'>{projIntro}</div>
          <div id='projDesc'>
            <MenuTabs></MenuTabs>
          </div>
        </div>
        <div className='scroll'>
          <div className='RewardSelect'>
            <ApprProj></ApprProj>
          </div>
        </div>
      </div>
    </div>
  );
}
