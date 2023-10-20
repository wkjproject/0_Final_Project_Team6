import React from "react"
import { useNavigate } from 'react-router';

export default function Thumbnail ({projId, image, isNew, projStatus, sday, MypageImageClass, MypageDivClass, MypageDivContent}) {
  //console.log('Thumbnail image: ', image);
  //console.log('Thumbnail isNew: ', isNew);
  // console.log(`project_id: ${projId}`);  



/* ----- 오늘날짜(today) 계산 -----*/
const date = new Date();
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + (date.getDate())).slice(-2);
const today = `${year}-${month}-${day}`;
const role = '1'; // 일반사용자라고 가정

  const navigate = useNavigate();
  const openProjDetails = () => {
    // console.log(`펀딩시작일: ${sday}, 오늘 :${today}`);
    // console.log('시작일 < 오늘', sday < today);
    // console.log('시작일 > 오늘', sday > today);

    if (projStatus === '0') {// 승인대기(0) --> 승인대기 프로그램
      navigate('/waitingProj', {state:{_id:projId}});
    } 
    else if (projStatus === '1') { // 승인된(1)
      (today < sday) // 오픈예정이면 --> 일반사용자(role=1): 경고 / 관리자&창작자: 상세페이지
      ? role === '1' ? alert('오픈예정 프로젝트입니다.') : navigate('/comingProj', {state:{_id:projId}})
      : navigate('/project2', {state:{_id:projId}}); // 진행중 --> 상세페이지로
    } 
    else if (projStatus === '2') { // 마감된(2) --> 프로젝트 상세페이지로
      navigate('/project2', {state:{_id:projId}});
    }
  }

  return (
    <div className={`thumbnail ${MypageDivClass === 'fundingProjectImgX' ? 'fundingProjectImgX' : ''}`} onClick={openProjDetails}>
      <img 
        className={`photo ${MypageImageClass}`}
        src={image}
        alt=''
      />
      <div className={MypageDivClass === 'fundingProjectTextConfirm' ? 'fundingProjectTextConfirm' : (MypageDivClass === 'fundingProjectTextWait' ? 'fundingProjectTextWait' : '')}>
        {MypageDivContent}
      </div>
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}

