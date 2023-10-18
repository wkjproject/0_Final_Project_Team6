import React from "react"
import { useNavigate } from 'react-router';

export default function Thumbnail ({projId, image, isNew, projStatus}) {
  //console.log('Thumbnail image: ', image);
  //console.log('Thumbnail isNew: ', isNew);

  const navigate = useNavigate();
  const openProjDetails = () => {
    console.log(`project_id: ${projId}`);
    console.log('projStatus:', projStatus);
    if (projStatus === '0') {
      alert('오픈예정 프로젝트입니다.');  // 오픈예정 프로젝트의 경우: 경고창 --> 추후 수정
    } else {
      navigate(projStatus === '1' ? '/project2': '/endedProj', {state:{_id:projId}}); // 진행중 --> '/project2'으로, 마감 --> '/endedProj'
    }
  }

  return (
    <div className="thumbnail" onClick={openProjDetails}>
      <img 
        className="photo"
        src={image}
        alt=''
        />
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}

