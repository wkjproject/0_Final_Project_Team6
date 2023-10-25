import React from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Endpoint from '../../config/Endpoint';
import axios from 'axios';
import { useState } from 'react';

Modal.setAppElement('#root'); // 모달을 사용하기 위한 설정

export const FundingStatusModal = ({ isOpen, closeModal, _id, projectData }) => {
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
          setFundingDetailData(res.data.fundingStatusModalData)
          setFundingUserName(res.data.fundingStatusModalUserName)
          setMount(true);
        })
      } catch (err) {
        console.log(err);
      }
    }

    FundingStatusModalData();
  }, []);
  // fundings 컬렉션에 user_id 기반으로 users컬렉션에서 userName 받아와서 닉네임 설정
  // 리워드 별 총합산액 계산
  const groupedData = {};
  if(fundingDetailData) {
  fundingDetailData.forEach((item) => {
  item.rewards.forEach((reward) => {
    const rewardId = reward.reward_id;
    if (!groupedData[rewardId]) {
      groupedData[rewardId] = {
        totalPrice: 0,
        totalCount: 0,
      };
    }
    groupedData[rewardId].totalPrice += reward.price;
    groupedData[rewardId].totalCount += reward.count;
  });
  });
  }
  // fundingDetailData 에 rewards에 들어있는 데이터로 리워드별 구분해서 
  console.log('projectData',projectData)
  console.log('fundingDetailData',fundingDetailData)
  console.log('fundingUserName',fundingUserName)
  console.log('groupedData',groupedData['일반'])
  return (
    <>
    {mount ? (
      <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <button style={{marginLeft: 'auto', display: 'block'}} onClick={closeModal}>닫기</button>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', textAlign:'center'}}>
        <br/>
        <h1>리워드 별 펀딩현황</h1>
        <br/>
        <table className='fundingStatusModalTable'>
          <tr>
            <th>리워드</th>
            <th>리워드 가격</th>
            <th>남은갯수 / 총 갯수</th>
            <th>총 후원금액</th>
          </tr>
          {
            projectData.projReward.map((reward, index) => {
              const rewardAmountData = groupedData[reward.projRewardName]
              return (
              <tr key={index}>
                <td>{reward.projRewardName}</td>
                <td>{reward.projRewardAmount}</td>
                <td>{`${reward.projRewardAvailable} / ${reward.projRewardCount}`}</td>
                <td>{rewardAmountData.totalPrice}</td>
              </tr>
            );
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
          <tr>
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
                  <tr key={key}>
                    <td>{item.fundingDate}</td>
                    <td>{userName}</td>
                    <td>{result.reward_id}</td>
                    <td>{result.count}</td>
                    <td>{result.price}</td>
                    <td>{item.fundingStatus}</td>
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