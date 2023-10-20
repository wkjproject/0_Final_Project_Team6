import './Home.css';
import ProjectCard from './ProjectCard';
// import Thumbnail from './Thumbnail';
import useFetch from '../hooks/useFetch';
import { useProjApi } from '../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// listtype:  home|openProj|newProj|deadlineProj|searchPage
function ProjectList({ listtype }) {
  const { keyword } = useParams();
  const { projs } = useProjApi();
  const {
    isLoading,
    error,
    data: allProjects,
  } = useQuery(['projects'], () => projs.search(keyword));

  if (!Array.isArray(allProjects) || !allProjects.length) {
    return <p>Nothing 😖</p>;
  }

  const filteredProjects = allProjects.filter((proj) => {
    switch (listtype) {
      case 'home':
        return proj.projStatus === '1';
      case 'openProj':
        let fundDate = new proj.projFundDate.projFundStartDate();
        let today = new Date();
        return proj.projStatus === '1' && fundDate < today;
      case 'newProj':
        break;
      case 'deadlineProj':
        break;
      case 'searchPage':
        break;
      default:
        break;
    }
    return true;
  });

  if (Array.isArray(filteredProjects) || !filteredProjects.length) {
    return <p>Nothing 😖</p>;
  }

  return (
    <div className='project-list'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 😖</p>}
      {filteredProjects.length > 0 &&
        filteredProjects.map((proj) => (
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
      {/* {[...Array(100)].map((e, i) => (
        <>
          <ProjectCard
            key={i + '1st'}
            image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
            title='선데이 어드벤쳐 보드게임'
            location='춘천시'
            dday='09월 24일(일)'
            price='5,000'
            isNew={true}
          />
          <ProjectCard
            key={i + '2nd'}
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
