import React, { useEffect, useState } from 'react';
import '../../../css/ManageProj.css';
import ProjectCard from '../ProjectCard';
import Endpoint from '../../../config/Endpoint';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../../css/Mypage/Mypage.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function FundingProject() {
  const endpoint = Endpoint();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.auth.auth.userId)
  // 펀딩프로젝트는 fundings 컬렉션에서 user_id가 현재 리덕스 userId랑 일치하는것만 가져와서 project_id 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 펀딩프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projPlace // fundings 의 rewards 갯수로 map 돌려서 반복
  const [fundings, setFundings] = useState();
  const [fundingProject, setFundingProject] = useState();
  // 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);

  // 펀딩ID 상태저장
  const [funding_id, setFunding_id] = useState(false);
  // 출발일 하루 전 결제취소누르면 정말 취소하냐고 한번 더 물어본 뒤 거기서 결제취소 누르면 취소되고 fundings 컬렉션에서 데이터 삭제

  // 제작프로젝트는 userProjects 컬렉션에서 users_id가 현재 리덕스 userId랑 일치하는것만 가져와서 userMadeProject 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 제작프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projReward[0]

  // 관심프로젝트는 userProjects 컬렉션에서 users_id가 현재 리덕스 userId랑 일치하는것만 가져와서 userLikeProject 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 관심프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projReward[0]
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
        alert(res.data.message);
        setModalIsOpen(false);
        window.location.reload()
      }
    })

  }
  console.log(fundings)
  console.log(fundingProject);
  return (
      <>
        {mount && fundingProject.map((projectArray, index) => {
          const funding = fundings[index]
          return projectArray.map((proj) => (
          <>
          <ProjectCard
            key={funding.funding_id}
            projId={proj.proj_id}
            image={proj.projMainImgPath}
            MypageImageClass={funding.fundingStatus === 3 ? 'fundingProjectImgX' : 'fundingProjectImg'}
            MypageDivClass={funding.fundingStatus === 3 ? 'fundingProjectImgX' : funding.fundingStatus === 0 ? 'fundingProjectTextWait' : 'fundingProjectTextConfirm'}
            MypageDivContent={funding.fundingStatus === 0 ? '대기' : funding.fundingStatus === 1 ? '확정' : ''}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
            cancelPay={funding.fundingStatus === 3? '' : (evt) => cancelPay(evt, funding.funding_id, proj.projName, proj.projDate, proj.projReward)}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                width: '20%',
                height: '10%',
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
        <button style={{ marginLeft: 'auto', display: 'block' }} onClick={() => setModalIsOpen(false)}>X</button>
        <h2>결제 취소</h2>
        <p>정말로 결제를 취소하시겠습니까?</p>
        <button style={{ marginLeft: 'auto', display: 'block' }} onClick={cancelPayDB}>결제취소</button>
      </Modal>
          </>
          ))
        })}

      </>
  );
}
