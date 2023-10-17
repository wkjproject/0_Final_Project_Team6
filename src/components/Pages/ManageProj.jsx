import React, { useState } from 'react';
import '../../css/ManageProj.css';
import ProjectCard from './ProjectCard';
import ProjectList from './ProjectsList';
import useFetch from '../hooks/useFetch';
import ProjectData from './../ProjectData';

export default function ManageProj() {
  const ProjectData = useFetch('/projects');
    
  const [activeTab, setActiveTab] = useState('waiting'); // 기본값: 승인대기 프로젝트
  const [currPage, setCurrPage] = useState(1);	// 기본값: 1페이지
  const projectsPerPage = 9; // 한 페이지에 보여줄 프로젝트 수(※가정)

  /* --- 탭 변경 함수 --- */
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
		setCurrPage(1); // 탭 변경시 1페이지로 초기화
  };

  // 페이지 변경
  const Pagination = (projects) => {
    const startIndex = (currPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return projects.slice(startIndex, endIndex);
  };

  	/* --- 페이지 이동 함수 --- */
	const toPrevPage = () => {	// 이전 페이지로 이동
    if (currPage > 1) {				// 현재 페이지가 1페이지보다 크면
      setCurrPage(currPage - 1);
    }
  };

  const toNextPage = () => {	// 다음 페이지로 이동
    const projectsPerPage = 9;		// 한 페이지에 표시할 프로젝트 수(※일단 9개로 설정)
    const totalProjects = ProjectData.length; // 전체 프로젝트 수
		console.log(totalProjects);
    const maxPages = Math.ceil(totalProjects / projectsPerPage);

    if (currPage < maxPages) {	// 현재 페이지가 마지막 페이지가 아니면
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div>
      <h1>프로젝트 관리</h1>
      <div className="tabs">
        {/* 승인 대기 프로젝트 탭 */}				
        <ul>
					<li
						className={`tab ${activeTab === 'waiting' ? 'active' : ''}`}
						onClick={() => handleTabClick('waiting')}
					>
						승인 대기 프로젝트
					</li>
					{/* 진행 중 프로젝트 탭 */}
					<li
						className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
						onClick={() => handleTabClick('ongoing')}
					>
						진행 중 프로젝트
					</li>
					{/* 마감된 프로젝트 탭 */}
					<li
						className={`tab ${activeTab === 'ended' ? 'active' : ''}`}
						onClick={() => handleTabClick('ended')}
					>
						마감된 프로젝트
					</li>
				</ul>
      </div>

      {/* 선택된 탭에 따라 내용을 표시 */}
      {activeTab === 'waiting' && (
        <div>
          <p>승인대기 프로젝트 내용</p>
          <div className='project-container'>
              {}
              <div className="page-button">
              <button onClick={toPrevPage}>이전</button> 
              <span>{currPage}</span>
              <button onClick={toNextPage}>다음</button>
              </div>
            
          </div>
        </div>
      )}
      {activeTab === 'ongoing' && (
        <div>
          {/* 진행중 내용 */}
          <div className='project-container'>
            {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
              ProjectData.filter((proj) => proj.projStatus === '1').map((proj) => (
                <ProjectCard
                  key={proj.projName}
                  projId={proj.proj_id}
                  image={proj.projMainImgPath}
                  title={proj.projName}
                  location={proj.projAddr.split(' ', 2)[1]}
                  dday={proj.projDate}
                  price={proj.projReward[0].projRewardAmount}
                  isNew={true}
                />
              ))}
          </div>
        </div>
      )}
      {activeTab === 'ended' && (
        <div>
          {/* 마감된 내용 */}
          <p>마감된 프로젝트 내용</p>
          <div className='project-container'>
            {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
              ProjectData.filter((proj) => proj.projStatus === '2').map((proj) => (
                <ProjectCard
                  key={proj.projName}
                  projId={proj.proj_id}
                  image={proj.projMainImgPath}
                  title={proj.projName}
                  location={proj.projAddr.split(' ', 2)[1]}
                  dday={proj.projDate}
                  price={proj.projReward[0].projRewardAmount}
                  isNew={true}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
