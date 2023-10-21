import React from 'react';
import { useNavigate } from 'react-router';
// import Endpoint from '../../../config/Endpoint';
// import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Thumbnail({
  projId,
  image,
  isNew,
  projStatus,
  sday,
  maderId,
  MypageImageClass,
  MypageDivClass,
  MypageDivContent,
}) {
  const navigate = useNavigate();

  /* ----- 오늘날짜(today) 계산 -----*/
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`;
  // console.log('시작일 < 오늘', sday < today);
  // console.log('시작일 > 오늘', sday > today);

  /* ----- 리덕스의 userId, isAdmin 가져오기 ----- */
  const userId = useSelector((state) => state.auth.auth['_id']); // 로그인한 userID
  const isAdmin = useSelector((state) => state.auth.auth.isAdmin); // 서비스 관리자 여부: true=관리자

  const openProjDetails = () => {
    // console.log(`isAdmin: ${isAdmin}, userId: ${userId}, maderId: ${maderId}`); // maderId = 해당 프로젝트 제작자 ID

    if (projStatus === '0') {
      // 승인대기(0) --> 승인대기 프로젝트
      navigate('/waitingProj', { state: { _id: projId } });
    } else if (projStatus === '1') {
      // 승인된(1)
      today < sday // 오픈예정 --> 관리자&제작자: 오픈 예정 상세페이지 / 이외 : 경고창
        ? isAdmin === true || userId === maderId
          ? navigate('/comingProj', { state: { _id: projId } })
          : alert('오픈예정 프로젝트입니다.')
        : navigate('/project2', { state: { _id: projId } }); // 진행중 --> 상세페이지로
    } else if (projStatus === '2') {
      // 마감된(2) --> 프로젝트 상세페이지로
      navigate('/project2', { state: { _id: projId } });
    } else if (projStatus === '3') {
      // 거절된(3) --> 경고창
      alert('승인거절된 프로젝트입니다.');
    }
  };

  isNew = false; // 쓰지않음 @sahn

  return (
    <div
      className={`thumbnail ${
        MypageDivClass === 'fundingProjectImgX' ? 'fundingProjectImgX' : ''
      }`}
      onClick={openProjDetails}
    >
      <img className={`photo ${MypageImageClass}`} src={image} alt='' />
      <div
        className={
          MypageDivClass === 'fundingProjectText'
            ? 'fundingProjectText'
            : MypageDivClass === 'fundingProjectTextWait'
            ? 'fundingProjectTextWait'
            : 'fundingProjectTextConfirm'
        }
      >
        {MypageDivContent}
      </div>
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}
