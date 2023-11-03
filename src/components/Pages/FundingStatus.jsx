import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Endpoint from '../../config/Endpoint';
import axios from 'axios';
import '../../css/FundingStatus.css'
import { FundingStatusModal } from './FundingStatusModal';

export default function FundingStatus() {
  // 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  // location 으로 _id 값 받아오기
  const location = useLocation();
  const { _id } = location.state || {};
  // 데이터 mount 될때까지 false
  const [mount, setMount] = useState(false);
  // _id(proj_id) 값 기준으로 projects컬렉션에서 projName, projFundGoal(목표액), projFundCollect(모인금액), projFundUserCount(후원자수)  projFundDate에 projFundEndDate (남은기간용도)
  const [fundingProjectData, setFundingProjectData] = useState();

	  useEffect(() => {
    const endpoint = Endpoint();
    const FundingStatusData = async () => {
      try {
        await axios.post(`${endpoint}/fundingStatus`, {
          _id
        }).then((res) => {
          setFundingProjectData(res.data)
          setMount(true);
        })
      } catch (err) {
        console.log(err);
      }
    }

    FundingStatusData();
  }, []);

  // 테이블 클릭 시 모달 창 열기
  const modalOpen = () => {
    setIsModalOpen(true);
  }
  // 모달 창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const deadline = fundingProjectData ? new Date(fundingProjectData.projFundDate[0].projFundEndDate) : null;
  const today = new Date();
  const remainDay = fundingProjectData ? Math.floor((deadline.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)) : null;

  return (
    <div>
      {mount ? 
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'50px' ,minHeight:'100vh'}}>
        <img src={fundingProjectData.projMainImgPath} alt='프로젝트 대표사진'/>
        <h1 style={{marginTop:'50px'}}>대시보드</h1>
        <h2 style={{marginTop:'15px'}}>{fundingProjectData.projName}</h2>
        <p style={{marginTop:'10px'}}>시작일:{fundingProjectData.projFundDate[0].projFundStartDate}&nbsp;&nbsp;&nbsp;마감일:{fundingProjectData.projFundDate[0].projFundEndDate}</p>
        <table className='fundingStatusTable' onClick={modalOpen} style={{marginTop:'50px', marginBottom:'300px'}}> 
            <tr className='fundingStatusTr'>
                <th>총 후원금액</th>
                <th>달성률</th>
                <th>후원자 수</th>
                <th>남은 기간</th>
            </tr> 
            <tr className='fundingStatusTr'>
                <td>{`${fundingProjectData.projFundCollect.toLocaleString()}원`}</td>
                <td>{`${(fundingProjectData.projFundCollect / fundingProjectData.projFundGoal * 100).toFixed(0)}%`}</td>
                <td>{`${fundingProjectData.projFundUserCount}명`}</td>
                <td>{`${remainDay}일`}</td>
            </tr>
        </table>
        <FundingStatusModal isOpen={isModalOpen} closeModal={closeModal} _id={_id} projectData={fundingProjectData}/>
      </div> 
        
        
        
      : (<div></div>)}
    </div>
  );
}
