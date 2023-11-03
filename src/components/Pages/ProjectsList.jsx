import './Home.css';
import ProjectCard from './ProjectCard';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function ProjectList({ listType, keyword }) {
  // const { keyword } = useParams();
  const [currPage, setCurrPage] = useState(1); // 기본 값: 1페이지
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
    return <p></p>;
  }

  /**
   * Take the difference between the dates and divide by milliseconds per day.
   * Round to nearest whole number to deal with DST.
   */
  function daysBetween(from, to) {
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    return Math.round((to - from) / (1000 * 60 * 60 * 24));
  }

  const filteredProjects = allProjects.filter((proj) => {
    const today = new Date();
    const fundStartDate = new Date(proj.projFundDate[0].projFundStartDate);
    const fundEndDate = new Date(proj.projFundDate[0].projFundEndDate);
    fundStartDate.setHours(0, 0, 0, 0);
    fundEndDate.setHours(23, 59, 59, 0);

    switch (listType) {
      case 'home':
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate
        );
      case 'openProj': // 오픈예정
        return proj.projStatus === '1' && today < fundStartDate;
      case 'newProj':
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate &&
          daysBetween(fundStartDate, today) < 9
        );
      case 'deadlineProj':
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate &&
          daysBetween(today, fundEndDate) < 9
        );
      case 'searchPage':
        return (
          proj.projStatus === '1' &&
          // fundStartDate <= today &&
          // today <= fundEndDate &&
          (proj.projName.toLowerCase().includes(keyword.toLowerCase()) ||
            // proj.projIntro.toLowerCase().includes(keyword.toLowerCase()) ||
            proj.projPlace.toLowerCase().includes(keyword.toLowerCase()) ||
            proj.projAddr.toLowerCase().includes(keyword.toLowerCase()))
        );
      default:
        break;
    }
    return true;
  });

  if (!Array.isArray(filteredProjects) || !filteredProjects.length) {
    return (
      <>
        <br />
        <h4>해당하는 프로젝트가 없습니다.</h4>
        <br />
        <br />
      </>
    );
  }

  /* --- 페이지 이동(pagination) 설정 --- */
  const projectPerPage = 12; // 페이지 당 표시할 프로젝트 수(※일단 2개로)
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
    <>
      <div className='project-list-container'>
        <div className='projects-home-list'>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {displayedProjectsList.length > 0 &&
            displayedProjectsList.map((proj, index) => {
              return (
                <ProjectCard
                  key={proj.proj_id + proj.projName}
                  projId={proj.proj_id}
                  projName={proj.projName}
                  image={proj.projMainImgPath}
                  location={proj.projAddr.split(' ', 2)[1]}
                  dday={proj.projDate}
                  sday={proj.projFundDate[0].projFundStartDate}
                  price={proj.projReward[0].projRewardAmount}
                  isNew={true}
                  projStatus={proj.projStatus}
                  maderId={proj.userMade_id}
                />
              );
            })}
        </div>
        {/* 페이지 이동(pagination) 버튼 */}
        {filteredProjects.length > projectPerPage && (
          <div className='pagination-p'>
            <button onClick={toPrevPage}>이전</button>
            <span>
              {'  '}
              {currPage} / {totalPages}
              {'  '}
            </span>
            <button onClick={toNextPage}>다음</button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectList;
