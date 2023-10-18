import React from 'react';
import useFetch from '../hooks/useFetch';
import MenuTabs from '../MenuTabs';
import { useLocation } from 'react-router';
import '../../css/EndedProj.css';
import '../ProjectData2.css';
import '../RewardSelect.css'

export default function EndedProj() {
  const location = useLocation();
  const { _id } = location.state || {};

  const projectData = useFetch('https://json-server-vercel-sepia-omega.vercel.app/projects');

  if (!projectData) {
    return <div>Loading...</div>;
  }

  // "proj_id" 값을 기반으로 해당 "projName"을 찾기
  const selectedProject = projectData.find((item) => item.proj_id === _id);

  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  const { projName, projMainImgPath, shortDesc } = selectedProject;

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
          <div className='shortDesc'>{shortDesc}</div>
          <div id='projDesc'>
            <MenuTabs></MenuTabs>
          </div>
        </div>
        <div className='scroll'>
          <div className='RewardSelect'>
            <p>마감된 프로젝트</p>
          </div>
        </div>
      </div>
    </div>
  );
}
