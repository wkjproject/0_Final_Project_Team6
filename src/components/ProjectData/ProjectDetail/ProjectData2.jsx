import React from 'react';
import MenuTabs from '../Menu/MenuTabs';
import RewardSelect from '../RewardSelect/RewardSelect';
import './ProjectData2.css';

import { useProjectsApi } from '../../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProjectData2() {
  const { projectId } = useParams();
  const _id = Number(projectId);
  //   console.log('projectId from useParam: ', projectId, _id);

  // 몽고DB 연결
  const { projects } = useProjectsApi();
  const { data: projectData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projects.getProjects(),
  });

  /* const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); */

  if (!projectData) {
    return <div>Loading...</div>;
  }

  // "proj_id" 값을 기반으로 해당 "projName"을 찾기
  const selectedProject = projectData.find((item) => item.proj_id === _id);

  if (!selectedProject) {
    return (
      <div className='loadingImage'>
        <img src='/Image20231031143853.gif' alt='로딩 이미지' />
      </div>
    );
  }

  const { projName, projMainImgPath, projIntro } = selectedProject;
  // 현재 _id(proj_id)값과 리덕스의 userId값이 일치하면 펀딩현황을 보여주도록

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
            <RewardSelect></RewardSelect>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectData2;
