import React, { useEffect, useState } from 'react';
import '../../../css/ManageProj.css';
import ProjectCard from '../ProjectCard';
import Endpoint from '../../../config/Endpoint';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../../css/Mypage/Mypage.css';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

export default function FundingProject() {
  axios.defaults.withCredentials = false;
  const endpoint = Endpoint();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.userData.userData.userId)

  const [fundings, setFundings] = useState();
  const [fundingProject, setFundingProject] = useState();
  // 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);

  // 펀딩ID 상태저장
  const [funding_id, setFunding_id] = useState(false);
  // 출발일 하루 전 결제취소누르면 정말 취소하냐고 한번 더 물어본 뒤 거기서 결제취소 누르면 취소되고 fundings 컬렉션에서 데이터 삭제

  useEffect(() => {
    const endpoint = Endpoint();
    const fundingProjectData = async () => {
      try {
        await axios.post(`${endpoint}/fundingProject`, {
          user_id
        }).then((res) => {
          setFundings(res.data.fundings);
          setFundingProject(res.data.projects);
          setMount(true);
        })
      } catch (err) {
        console.log(err);
      }
    }

    fundingProjectData();
  }, []);

  //결제취소부분
  //결제취소 누르면 모달창으로 띄워서 프로젝트이름, 결제날짜, 결제리워드 띄워주고 결제취소하시겠습니까? 예 하면 취소되는걸로
  // 
  const cancelPay = async (evt, funding_id, projName, fundingDate, rewards ) => {
    evt.preventDefault();
    setFunding_id(funding_id)
    setModalIsOpen(true);
    

  }
  const cancelPayDB = async (evt) => {
    evt.preventDefault();
    // funding_id 기준으로 DB에서 삭제
    await axios.post(`${endpoint}/cancelPayDB`, {
      funding_id
    }).then((res)=>{
      if(res.data.cancelPaySuccess){
        toast(res.data.message);
        setModalIsOpen(false);
        window.location.reload()
      }
    })

  }
  /* --- 페이지 이동(pagination) 설정 --- */
  const [currPage, setCurrPage] = useState(1);

  const projectPerPage = 6;

  const totalPages = fundingProject ? Math.ceil(fundingProject.length / projectPerPage): '';
  const startIndex = (currPage - 1) * projectPerPage;
  const endIndex = startIndex + projectPerPage;
  const displayedProjectsList = fundingProject ? fundingProject.slice(startIndex, endIndex): '';
  const displayedFundingList = fundings ? fundings.slice(startIndex, endIndex): '';


  /* --- 페이지 이동 함수 --- */
  const toPrevPage = () => {
    if (currPage > 1) {

      // 현재 페이지가 1페이지보다 크면
      setCurrPage(currPage - 1);
    }
  };

  const toNextPage = () => {
    if (currPage < totalPages) {
      // 현재 페이지가 마지막 페이지가 아니면
      setCurrPage(currPage + 1);
    }
  };
  return (
      <>
      <div className='projects-list'>
        {mount && displayedProjectsList.map((projectArray, index) => {
          const funding = displayedFundingList[index]
          return projectArray.map((proj) => (
          <>
          <ProjectCard
            key={proj.proj_id}
            projId={proj.proj_id}
            projStatus={proj.projStatus}
            image={proj.projMainImgPath}
            MypageImageClass={funding.fundingStatus === 3 ? 'fundingProjectImgX' : 'fundingProjectImg'}
            MypageDivClass={funding.fundingStatus === 3 ? 'fundingProjectImgX' : funding.fundingStatus === 0 ? 'fundingProjectTextWait' : 'fundingProjectTextConfirm'}
            MypageDivContent={funding.fundingStatus === 0 ? '대기' : funding.fundingStatus === 1 ? '확정' : ''}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
            cancelPay={funding.fundingStatus === 2? '' : (evt) => cancelPay(evt, funding.funding_id, proj.projName, proj.projDate, proj.projReward)}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                width: '400px',
                height: '165px',
                overflow: 'hidden',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
              },
            }}
          >
        <button className='fundingCancelBtn' onClick={() => setModalIsOpen(false)}>X</button>
        <h2>결제 취소</h2>
        <br/>
        <br/>
        <p>정말로 결제를 취소하시겠습니까?</p>
        <button className='fundingCancelBtn'style={{backgroundColor: 'var(--ButtonDefault)', width: '75px', height: '30px'}} onClick={cancelPayDB}>결제취소</button>
      </Modal>
      </>
          ))
        })}
        </div>
        {totalPages === 1 ? (''): (        
        <div className='mypagePagination'>
          <button onClick={toPrevPage}>이전</button>
          <span>
            {'  '}
            {currPage} / {totalPages}{'  '}
          </span>
          <button onClick={toNextPage}>다음</button>
        </div>)}
    </>
  );
}
