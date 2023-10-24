import './Home.css';
import ProjectCard from './ProjectCard';
import { useProjectsApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';

function ProjectList({ listtype }) {
  // const { keyword } = useParams();
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
    return <p> allProjects Nothing 😖</p>;
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

    switch (listtype) {
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
          daysBetween(fundStartDate, today) < 3
        );
      case 'deadlineProj':
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
        filteredProjects.map((proj, index) => {
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
