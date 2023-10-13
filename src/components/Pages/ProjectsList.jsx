import './Home.css';
import ProjectCard from './ProjectCard';
// import Thumbnail from './Thumbnail';
import useFetch from '../hooks/useFetch';

function ProjectList() {
  const ProjectData = useFetch("/projects");
  if (ProjectData !== undefined && ProjectData !== null && ProjectData.length) { // 데이터가 언디파인이 아니거나 존재하거나 데이터가 조회되면
    console.log("프로젝트데이터:", ProjectData);
    //console.log(ProjectData[0]);
  }

  return (
    <div className="project-list">
      {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
        ProjectData.map((proj) => (
          <ProjectCard 
            key={proj.projName}
            image={proj.projMainImgPath}
            title={proj.projName}
            location={proj.projAddr.split(' ',2)[1]}

            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
            isNew={true}
        />
        ))
      }
      <hr></hr>
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
        title='선데이 어드벤쳐 보드게임'
        location='춘천시'
        dday='09월 24일(일)'
        price='5,000원~'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원~'
        isNew={true}
        />
      <ProjectCard
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
        title='선데이 어드벤쳐 보드게임'
        location='춘천시'
        dday='09월 24일(일)'
        price='5,000원~'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원~'
        isNew={true}
        />
      <ProjectCard
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
        title='선데이 어드벤쳐 보드게임'
        location='춘천시'
        dday='09월 24일(일)'
        price='5,000원~'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원~'
        isNew={true}
        />
      <ProjectCard
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/kyrielle/71287/ProjectInfo/Cover/1a6c262bb3664008b6475814bac58626.jpg'
        title='선데이 어드벤쳐 보드게임'
        location='춘천시'
        dday='09월 24일(일)'
        price='5,000원~'
        isNew={true}
      />
      <ProjectCard 
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원~'
        isNew={true}
        />
      <ProjectCard
        image='https://eventusstorage.blob.core.windows.net/evs/Image/greentea71/71356/ProjectInfo/Cover/7a96c12df916464891b9de7b4e8cf35b.jpg'
        title='부산 세븐브릿지 을숙도대교 아웃도어미션게임<새이마이네임>'
        location='부산'
        price='11,000원'
        isNew={true}
      />
    </div>
  );
}

export default ProjectList;
