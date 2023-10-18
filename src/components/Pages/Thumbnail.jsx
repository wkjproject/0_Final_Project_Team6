import React from "react"
import { useNavigate } from 'react-router';

export default function Thumbnail ({projId, image, isNew, projStatus, sday}) {
  // console.log('Thumbnail image: ', image);
  // console.log('Thumbnail isNew: ', isNew);
  // console.log(`project_id: ${projId}`);  

/* ----- 오늘날짜(today) 계산 -----*/
const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + (date.getDate())).slice(-2);
const today = `${year}-${month}-${day}`;

  const navigate = useNavigate();
  const openProjDetails = () => {
    // console.log(`펀딩시작일: ${sday}, 오늘 :${today}`);
    // console.log('시작일 < 오늘', sday < today);
    // console.log('시작일 > 오늘', sday > today);

    if (projStatus !== '1') { // '0' --> 승인대기, '2' --> 마감된
      navigate(projStatus === '0' ? '/waitingProj': '/endedProj', {state:{_id:projId}});
    } else {
      // 진행중(1) : 오늘 < 펀딩시작일 --> 경고 / 아니면 --> 상세페이지로
      (today < sday) ? alert('오픈예정 프로젝트입니다.') : navigate('/project2', {state:{_id:projId}});
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

