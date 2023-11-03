import React from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Endpoint from '../../config/Endpoint';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // 모달을 사용하기 위한 설정

export const FundingStatusModal = ({ isOpen, closeModal, _id, projectData }) => {
  const endpoint = Endpoint();
  const customStyles = {
  content: {
    width: '1000px',
    margin: 'auto',
  },
  };
  // 데이터 mount 될때까지 false
  const [mount, setMount] = useState(false);
  const [fundingDetailData, setFundingDetailData] = useState();
  const [fundingUserName, setFundingUserName] = useState();
  // 모달에서 사용할 내용은 projectData로 받아온내용에서 projReward(리워드내용), projFundCollect(총모금액)
  // fundings 컬렉션에 id(proj_id)와 project_id가 같은것만 전체 필드 다 가져오고
  useEffect(() => {
    const endpoint = Endpoint();
    const FundingStatusModalData = async () => {
      try {
        await axios.post(`${endpoint}/fundingStatusModal`, {
          _id
        }).then((res) => {
          if (res.data.fundingStatusModalDataSuccess){
            if (res.data.fundingStatusModalData.length === 0){
              toast('펀딩 데이터가 없습니다.');
              window.history.back();
            } else {
            setFundingDetailData(res.data.fundingStatusModalData)
            setFundingUserName(res.data.fundingStatusModalUserName)
            setMount(true);
            }
          }
          if (!res.data.fundingStatusModalDataSuccess){
            toast('펀딩 데이터가 없습니다.');
            window.history.back();
          }
        })
      } catch (err) {
        console.log(err);
      }
    }

    FundingStatusModalData();
  }, []);
  // fundings 컬렉션에 user_id 기반으로 users컬렉션에서 userName 받아와서 닉네임 설정
  // 리워드 별 총합산액 계산
  const groupedData = fundingDetailData ? fundingDetailData.reduce((accumulator, item) => {
  item.rewards.forEach((reward) => {
    const rewardId = reward.reward_id;

    if (!accumulator[rewardId]) {
      accumulator[rewardId] = {
        totalPrice: 0,
        totalCount: 0,
      };
    }

    accumulator[rewardId].totalPrice += reward.price;
    accumulator[rewardId].totalCount += reward.count;
  });

  return accumulator;
  }, {}): 0;
  // funding_id로 찾아서 대기 / 확정 / 거절 누르면 DB에 상태값이 바뀌도록
  const fundingStatusHandler = async (funding_id, statusChangeNumber) => {
      try {
    await axios.post(`${endpoint}/fundingStatusModalChangeStatus`, {
      funding_id,
      statusChangeNumber
    }).then((res) => {
      if(res.data.statusChangeSuccess){
        // 변경 성공시 데이터 다시불러오기
      const FundingStatusModalData = async () => {
          try {
            await axios.post(`${endpoint}/fundingStatusModal`, {
              _id
            }).then((res) => {
              setFundingDetailData(res.data.fundingStatusModalData)
              setFundingUserName(res.data.fundingStatusModalUserName)
              setMount(true);
            })
          } catch (err) {
            console.log(err);
          }
       }
        FundingStatusModalData();
      }
    })
  } catch (err) {
    console.log(err);
  }
  }

  return (
    <>
    {mount ? (
      <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <button className='SignupTermsBtnX' onClick={closeModal}><svg viewBox="0 0 40 40" focusable="false" role="presentation" class="withIcon_icon__3VTbq ConfirmModal_closeIcon__23VbM" aria-hidden="true"><path d="M33.4 8L32 6.6l-12 12-12-12L6.6 8l12 12-12 12L8 33.4l12-12 12 12 1.4-1.4-12-12 12-12z"></path></svg></button>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', textAlign:'center'}}>
        <br/>
        <h1>리워드 별 펀딩현황</h1>
        <br/>
        <table className='fundingStatusModalTable'>
          <tr className='fundingStatusModalTrHead'>
            <th>리워드</th>
            <th>리워드 가격</th>
            <th>남은갯수 / 총 갯수</th>
            <th>총 후원금액</th>
          </tr>
          {
            projectData.projReward.map((reward, index) => {
              if (groupedData[reward.projRewardName]){
              const rewardAmountData = groupedData[reward.projRewardName]
              return (
                <tr key={index} className='fundingStatusModalTr'>
                  <td>{reward.projRewardName}</td>
                  <td>{reward.projRewardAmount}</td>
                  <td>{`${reward.projRewardAvailable} / ${reward.projRewardCount}`}</td>
                  <td>{rewardAmountData.totalPrice}</td>
                </tr>
            );
              }
            })
          }
        </table>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>펀딩 세부내역</h2>
        <br/>
        <table className='fundingStatusModalTable'>
          <tr className='fundingStatusModalTrHead'>
            <th>결제일</th>
            <th>유저 닉네임</th>
            <th>펀딩 리워드</th>
            <th>결제 갯수</th>
            <th>결제 금액</th>
            <th>참가 여부</th>
          </tr>
            {
              fundingDetailData.map((item, index) => {
                const user = fundingUserName.find((user) => user.userId === item.user_id);
                const userName = user ? user.userName : "알 수 없음"; // userName이 없는 경우에 대비

                return item.rewards.map((result, key) => (
                  <tr key={key} className='fundingStatusModalTr'>
                    <td>{item.fundingDate}</td>
                    <td>{userName}</td>
                    <td>{result.reward_id}</td>
                    <td>{result.count}</td>
                    <td>{result.price}</td>
                    {/* 0이면 대기, 1이면 확정, 나머지 거절 */}
                    <td>  <span className='fundingStatusModalStatus' onClick={() => (fundingStatusHandler(item.funding_id,0))} style={{color: item.fundingStatus === 0 ? 'var(--ButtonDefault)' : 'black'}}>대기</span>&nbsp; / &nbsp;
                          <span className='fundingStatusModalStatus' onClick={() => (fundingStatusHandler(item.funding_id,1))} style={{color: item.fundingStatus === 1 ? 'var(--ButtonDefault)' : 'black'}}>확정</span>&nbsp; / &nbsp; 
                          <span className='fundingStatusModalStatus' onClick={() => (fundingStatusHandler(item.funding_id,3))} style={{color: item.fundingStatus === 3 ? 'var(--ButtonDefault)' : 'black'}}>거절</span></td>
                  </tr>
                ));
              })
            }
        </table>
      </div>
    </Modal>
    ) : ('')}
    </>
  );
};