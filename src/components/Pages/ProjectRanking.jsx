import React from 'react';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'react-router-dom';
// import ProjectCard from './ProjectCard';
import ProjectRankingCard from './ProjectRankingCard';

export default function ProjectRanking() {
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
    return <p> Nothing 😅</p>;
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
    const res =
      a.projFundCollect === b.projFundCollect
        ? b.projLike - a.projLike
        : b.projFundCollect - a.projFundCollect;
    console.log('sort ret: ', res, isNaN);
    return isNaN(a.projFundCollect) || isNaN(a.projLike) || isNaN(res)
      ? 1
      : res;
  });

  if (!Array.isArray(filteredProjects) || !filteredProjects.length) {
    return <p> No active projects😖</p>;
  }

  return (
    <>
      <div className='project-ranking-list'>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredProjects.length > 0 &&
          filteredProjects.map((proj, index) => (
            <ProjectRankingCard
              key={proj.proj_id + proj.projName}
              projLike={proj.projLike}
              projFundCollect={proj.projFundCollect}
              projId={proj.proj_id}
              projName={proj.projName}
              image={proj.projMainImgPath}
              title={proj.projName}
              location={proj.projAddr.split(' ', 2)[1]}
              dday={proj.projDate}
              sday={proj.projFundDate[0].projFundStartDate}
              price={proj.projReward[0].projRewardAmount}
              isNew={true}
              projStatus={proj.projStatus}
              maderId={proj.userMade_id}
            />
          ))}
      </div>
    </>
  );
}
