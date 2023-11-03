// 오픈예정 프로젝트 상세 화면: 프로젝트 제작자 및 서비스 관리자만 출입가능
import React from 'react';
import { useLocation } from 'react-router';
import useFetch from '../../hooks/useFetch';
import MenuTabs from '../../ProjectData/Menu/MenuTabs';
import ComingNotice from './ComingNotice';
import { useQuery } from '@tanstack/react-query';
import { useProjectsApi } from '../../../context/ProjectsApiContext';
import { useParams } from 'react-router-dom';

export default function ComingProj() {
  const location = useLocation();
  const { _id } = location.state || {};
    // 몽고DB
  const { projects } = useProjectsApi();
    const {
        data: projectData,
        } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projects.getProjects(),
    });
/*   const projectData = useFetch(
    'https://json-server-vercel-sepia-omega.vercel.app/projects'
  ); */

  if (!projectData) {
    return <div>Loading...</div>;
  }

  // "proj_id" 값을 기반으로 해당 "projName"을 찾기
  const selectedProject = projectData.find((item) => item.proj_id === _id);

  if (!selectedProject) {
    return <div className='loadingImage'>
      <img src="/Image20231031143853.gif" alt="로딩 이미지" />
    </div>;
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
            <ComingNotice></ComingNotice>
          </div>
        </div>
      </div>
    </div>
  );
}
