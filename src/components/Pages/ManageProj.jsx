import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProjectCard from './ProjectCard';
import '../../css/ManageProj.css';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
// import ProjectList from './ProjectsList';

export default function ManageProj() {
   // 몽고DB
  const { projects } = useProjectsApi();
    const {
        data: ProjectData,
        } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projects.getProjects(),
    });

  /* const ProjectData = useFetch(
    'https://json-server-vercel-sepia-omega.vercel.app/projects'
  ); */

  const projList = ProjectData ? Object.values(ProjectData) : [];

  const projectPerPage = 6; // 페이지 당 표시할 프로젝트 수(※일단 2개로)
  const [currTab, setCurrTab] = useState('waiting'); // 기본 값: 승인대기 프로젝트
  const [currPage, setCurrPage] = useState(1); // 기본 값: 1페이지

  /* --- 탭 변경 함수 --- */
  const handleTabClick = (tabName) => {
    setCurrTab(tabName);
    setCurrPage(1); // 탭 변경시, 1페이지로 초기화
  };

  /* --- 탭이름 및 projStatus(0: 승인대기 / 1: 진행중 / 2: 마감)에 따른 탭 구분 --- */
  const filteredProjects =
    currTab === 'waiting'
      ? projList.filter((proj) => proj.projStatus === '0') // 승인대기 프로젝트
      : projList.filter((proj) => {
          if (currTab === 'ongoing') return proj.projStatus === '1'; // 진행 중 프로젝트
          if (currTab === 'ended') return proj.projStatus === '2'; // 마감된 프로젝트
          return true;
        });

  /* --- 페이지 이동(pagination) 설정 --- */
  const totalPages = Math.ceil(filteredProjects.length / projectPerPage);
  const startIndex = (currPage - 1) * projectPerPage;
  const endIndex = startIndex + projectPerPage;
  const displayedProjectsList = filteredProjects.slice(startIndex, endIndex);

  /* --- 페이지 이동 함수 --- */
  const toPrevPage = () => {
    if (currPage > 1) {
      // 현재 페이지가 1페이지보다 크면
      setCurrPage(currPage - 1);
    }
  };

  const toNextPage = () => {
    if (currPage < totalPages) {
      // 현재 페이지가 마지막 페이지가 아니면
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div className='manage-project-container'>
      <h1 className='manage-project'>프로젝트 관리</h1>
      {/* 프로젝트 탭 */}
      <div className='tabs'>
        <ul>
          <li
            className={`tab ${currTab === 'waiting' ? 'active' : ''}`}
            onClick={() => handleTabClick('waiting')}
          >
            승인 대기 프로젝트
          </li>
          <li
            className={`tab ${currTab === 'ongoing' ? 'active' : ''}`}
            onClick={() => handleTabClick('ongoing')}
          >
            진행 중 프로젝트
          </li>
          <li
            className={`tab ${currTab === 'ended' ? 'active' : ''}`}
            onClick={() => handleTabClick('ended')}
          >
            마감된 프로젝트
          </li>
        </ul>
      </div>

      {/* 선택된 탭에 따라 내용을 표시 */}
      <div className='projects-container'>
        <div className='projects-list'>
          {displayedProjectsList.map((proj) => (
            <ProjectCard
              key={proj.proj_id}
              projId={proj.proj_id}
              image={proj.projMainImgPath}
              projName={proj.projName}
              location={proj.projAddr.split(' ', 2)[1]}
              dday={proj.projDate}
              sday={proj.projFundDate[0].projFundStartDate}
              price={proj.projReward[0].projRewardAmount}
              isNew={currTab === 'ongoing'} // ※ 일단 진행중 프로젝트는 == new 버튼 표시
              projStatus={proj.projStatus}
            />
          ))}
        </div>

        {/* 페이지 이동(pagination) 버튼 */}
        <div className='pagination'>
          <button onClick={toPrevPage}>이전</button>
          <span>
            {'  '}
            {currPage} / {totalPages}{'  '}
          </span>
          <button onClick={toNextPage}>다음</button>
        </div>
      </div>
    </div>
  );
}
