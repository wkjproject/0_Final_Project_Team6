import './Home.css';
import ProjectCard from './ProjectCard';
// import Thumbnail from './Thumbnail';
import useFetch from '../hooks/useFetch';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import JsonServerClient, { getProjects } from '../../api/jsonsSrverClient';

// listtype:  home|openProj|newProj|deadlineProj|searchPage
function ProjectList({ listtype }) {
  // const { keyword } = useParams();
  const { projects } = useProjectsApi();
  const {
    isLoading,
    error,
    data: allProjects,
  } = useQuery(['projects'], () => projects.getProjects());

  // console.log('0. allProjects: ', allProjects);

  if (!Array.isArray(allProjects) || !allProjects.length) {
    return <p> allProjects Nothing 😖</p>;
  }

  /**
   * Take the difference between the dates and divide by milliseconds per day.
   * Round to nearest whole number to deal with DST.
   */
  function daysBetween(from, to) {
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);
    console.log(
      'days from to: ',
      Math.round((to - from) / (1000 * 60 * 60 * 24))
    );
    return Math.round((to - from) / (1000 * 60 * 60 * 24));
  }

  const filteredProjects = allProjects.filter((proj) => {
    const today = new Date();
    const fundStartDate = new Date(proj.projFundDate[0].projFundStartDate);
    const fundEndDate = new Date(proj.projFundDate[0].projFundEndDate);
    // today.setHours(0, 0, 0, 0);
    fundStartDate.setHours(0, 0, 0, 0);
    fundEndDate.setHours(23, 59, 59, 0);

    // console.log(`filter():listtype =>, ${listtype}, proj-id:${proj.proj_id}`);
    // console.log('  projStatus: ', proj.projStatus);
    // console.log(`  today: ${today}`);
    // console.log(`  fundStartDate:${fundStartDate.toDateString()}`);
    // console.log(`  fundEndDate:${fundEndDate.toDateString()}`);

    switch (listtype) {
      case 'home':
        // console.log(
        //   `home: ${proj.proj_id} => `,
        //   proj.projStatus === '1' &&
        //   fundStartDate <= today &&
        //   today <= fundEndDate
        // );
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate
        );
      case 'openProj': // 오픈예정
        // console.log(
        //   `openProj: ${proj.proj_id} => `,
        //   proj.projStatus === '1' && today < fundStartDate
        // );
        return proj.projStatus === '1' && today < fundStartDate;
      case 'newProj':
        // console.log(
        //   `newProj: ${proj.proj_id} => `,
        //   proj.projStatus === '1' &&
        //   fundStartDate <= today &&
        //   today <= fundEndDate &&
        //   daysBetween(fundStartDate, today) < 3
        // );
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate &&
          daysBetween(fundStartDate, today) < 3
        );
      case 'deadlineProj':
        // console.log(
        //   `deadlineProj: ${proj.proj_id} => `,
        //   proj.projStatus === '1' &&
        //   fundStartDate <= today &&
        //   today <= fundEndDate &&
        //   daysBetween(today, fundEndDate) < 3
        // );
        return (
          proj.projStatus === '1' &&
          fundStartDate <= today &&
          today <= fundEndDate &&
          daysBetween(today, fundEndDate) < 3
        );
      case 'searchPage':
        break;
      default:
        break;
    }
    return true;
  });

  if (!Array.isArray(filteredProjects) || !filteredProjects.length) {
    return <p> filteredProjects Nothing 😖</p>;
  }

  return (
    <div className='project-list'>
      {isLoading && <p>Loading...</p>}
      {error && <p> 😖 {error}</p>}
      {filteredProjects.length > 0 &&
        filteredProjects.map((proj) => (
          <ProjectCard
            key={proj.projName}
            projId={proj.proj_id}
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
      {/* {[...Array(100)].map((e, i) => (
        <>
          <ProjectCard key={i + '1st'}
            image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
            title='선데이 어드벤쳐 보드게임'
            location='춘천시'
            dday='09월 24일(일)'
            price='5,000'
            isNew={true}
          />
          <ProjectCard key={i + '2nd'}
            image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
            title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
            location='부산'
            price='11,000'
            isNew={true}
          />
        </>
      ))} */}
    </div>
  );
}

export default ProjectList;
