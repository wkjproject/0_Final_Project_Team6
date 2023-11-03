import React from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectRankingThumbnail(props) {
  const navigate = useNavigate();

  /* ----- 오늘날짜(today) 계산 -----*/
  const today = new Date();

  const openProjDetails = () => {
    if (props.projStatus === '0') {
      // 승인대기(0) --> 승인대기 프로젝트
      navigate('/waitingProj', { state: { _id: props.projId } });
    } else if (props.projStatus === '1') {
      // 승인된(1)
      today < props.sday // 오픈예정 --> 관리자&제작자: 오픈 예정 상세페이지 / 이외 : 경고창
        ? props.isAdmin === true || props.userId === props.maderId
          ? navigate('/comingProj', { state: { _id: props.projId } })
          : alert('오픈예정 프로젝트입니다.')
        : // : navigate('/project2', { state: { _id: props.projId } }); // 진행중 --> 상세페이지로
          navigate(`/project2/${props.projId}`);
    } else if (props.projStatus === '2') {
      // 마감된(2) --> 프로젝트 상세페이지로
      // navigate('/project2', { state: { _id: props.projId } });
      navigate(`/project2/${props.projId}`);
    } else if (props.projStatus === '3') {
      // 거절된(3) --> 경고창
      toast('승인거절된 프로젝트입니다.');
    }
  };

  //props.isNew = false; // 쓰지않음 @sahn

  return (
    <div
      className={`project-ranking-card-thumbnail ${
        props.MypageDivClass === 'fundingProjectImgX'
          ? 'fundingProjectImgX'
          : ''
      }`}
      onClick={openProjDetails}
    >
      <img
        className={`photo ${props.MypageImageClass}`}
        src={props.image}
        alt=''
      />
      <div
        className={
          props.MypageDivClass === 'fundingProjectTextWait'
            ? 'fundingProjectTextWait'
            : props.MypageDivClass === 'fundingProjectTextConfirm'
            ? 'fundingProjectTextConfirm'
            : props.MypageDivClass === 'fundingProjectRefuse'
            ? 'fundingProjectRefuse'
            : props.MypageDivClass === 'fundingProjectClosed'
            ? 'fundingProjectClosed'
            : ''
        }
      >
        {props.MypageDivContent}
      </div>
      {/* {props.isNew && <span className='new-tag'>new</span>} */}
    </div>
  );
}
