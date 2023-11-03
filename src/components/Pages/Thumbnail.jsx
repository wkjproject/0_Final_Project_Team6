import React from 'react';
import { useNavigate } from 'react-router';
// import Endpoint from '../../../config/Endpoint';
// import axios from 'axios';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Thumbnail({
  projId,
  projName,
  image,
  isNew,
  projStatus,
  sday,
  maderId,
  MypageImageClass,
  MypageDivClass,
  MypageDivContent,
  cancelLike,
}) {
  const navigate = useNavigate();

  /* ----- 오늘날짜(today) 계산 -----*/
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`;
  // console.log(`Thumbnail: ${projId} => ${projName}`);
  // console.log('시작일 < 오늘', sday < today);
  // console.log('시작일 > 오늘', sday > today);
  // console.log(`오늘: ${today}, 시작일: ${sday}`);

  /* ----- 리덕스의 userId, isAdmin. isLogin 가져오기 ----- */
  const userId = useSelector((state) => state.userData.userData['_id']); // 로그인한 userID
  const isAdmin = useSelector((state) => state.userData.userData.isAdmin); // 서비스 관리자 여부: true=관리자
  const isLogin = useSelector((state) => state.auth.auth.isLogin); // 로그인 여부

  const openProjDetails = () => {
    // console.log(`isAdmin: ${isAdmin}, userId: ${userId}, maderId: ${maderId}`); // maderId = 해당 프로젝트 제작자 ID
    // console.log(`isLogin = ${isLogin}`);
    if (projStatus === '0') {
      // 승인대기(0) --> 승인대기 프로젝트
      navigate('/waitingProj', { state: { _id: projId } });
    } else if (projStatus === '1') {
      // 승인된(1)
      const customId = 'msg-id-opening';
      today < sday // 오픈예정 --> 관리자&제작자: 오픈 예정 상세페이지 / 이외 : 경고창
        ? isLogin && (isAdmin === true || userId === maderId)
          ? navigate('/comingProj', { state: { _id: projId } })
          : // : alert('오픈예정 프로젝트입니다.')
            toast('오픈예정 프로젝트입니다.', {
              toastId: customId,
            })
        : // : navigate('/project2', { state: { _id: projId } }); // 진행중 --> 상세페이지로
          navigate(`/project2/${projId}`);
    } else if (projStatus === '2') {
      // 마감된(2) --> 프로젝트 상세페이지로
      // navigate('/project2', { state: { _id: projId } });
      navigate(`/project2/${projId}`);
    } else if (projStatus === '3') {
      // 거절된(3) --> 경고창
      // alert('승인거절된 프로젝트입니다.');
      toast('승인거절된 프로젝트입니다.');
    }
  };

  isNew = false; // 쓰지않음 @sahn

  return (
    <div
      className={`thumbnail ${
        MypageDivClass && MypageDivClass === 'fundingProjectImgX'
          ? 'fundingProjectImgX'
          : ''
      }`}
      onClick={openProjDetails}
    >
      <img className={`photo ${MypageImageClass}`} src={image} alt='' />
      <div
        className={
          MypageDivClass === 'fundingProjectTextWait'
            ? 'fundingProjectTextWait'
            : MypageDivClass === 'fundingProjectTextConfirm'
            ? 'fundingProjectTextConfirm'
            : MypageDivClass === 'LikeProjectImg'
            ? 'LikeProjectImg'
            : MypageDivClass === 'fundingProjectRefuse'
            ? 'fundingProjectRefuse'
            : MypageDivClass === 'fundingProjectClosed'
            ? 'fundingProjectClosed'
            : ''
        }
      >
        {MypageDivClass === 'LikeProjectImg' ? (
          <button
            className='LikeProjectButton'
            onClick={(evt) => {
              cancelLike(evt);
              evt.stopPropagation(); // 이벤트 전파 중단
            }}
          >
            <svg
              viewBox='0 0 32 32'
              focusable='false'
              role='presentation'
              class='withIcon_icon__3VTbq'
              aria-hidden='true'
            >
              <path
                d='M22.16 4h-.007a8.142 8.142 0 0 0-6.145 2.79A8.198 8.198 0 0 0 9.76 3.998a7.36 7.36 0 0 0-7.359 7.446c0 5.116 4.64 9.276 11.6 15.596l 2 1.76 2-1.76c6.96-6.32 11.6-10.48 11.6-15.6v-.08A7.36 7.36 0 0 0 22.241 4h-.085'
                fill='red'
                fill-opacity='1'
                stroke='red'
                stroke-width='2'
                shape-rendering='crispEdges'
              ></path>
            </svg>
          </button>
        ) : (
          MypageDivContent
        )}
      </div>
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}
