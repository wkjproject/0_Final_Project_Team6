import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../../css/Mypage/Mypage.css';
import FundingProject from './FundingProject';
import MadeProject from './MadeProject';
import LikeProject from './LikeProject';
import UserProfileModify from './UserProfileModify';
import { FaUserCircle } from 'react-icons/fa';

export default function Mypage() {
  // 리덕스의 userName 가져오기
  const userName = useSelector((state) => state.userData.userData.userName)
  // 펀딩프로젝트는 fundings 컬렉션에서 user_id가 현재 리덕스 userId랑 일치하는것만 가져와서 project_id 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 펀딩프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projPlace // fundings 의 rewards 갯수로 map 돌려서 반복

  
  // 데이터 불러올때까지 mount 값 false
  const [currTab, setCurrTab] = useState('funding');
    /* --- 탭 변경 함수 --- */
  const handleTabClick = (tabName) => {
    setCurrTab(tabName);
  };
  // 출발일 하루 전 결제취소누르면 정말 취소하냐고 한번 더 물어본 뒤 거기서 결제취소 누르면 취소되고 fundings 컬렉션에서 데이터 삭제

  // 제작프로젝트는 userProjects 컬렉션에서 users_id가 현재 리덕스 userId랑 일치하는것만 가져와서 userMadeProject 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 제작프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projReward[0]

  // 관심프로젝트는 userProjects 컬렉션에서 users_id가 현재 리덕스 userId랑 일치하는것만 가져와서 userLikeProject 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 관심프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projReward[0]

  return (
    <div style={{textAlign:'center', minHeight:'100vh'}}>
      <br/>
      <br/>
      <img src='/img/user-solid2.png' alt='person' style={{height:'128px', width:'128px'}}/>
      <h1 style={{marginTop:'10px'}}>{userName}</h1>
      <br/>
      <br/>
      {/* 프로젝트 탭 */}
      <div className='tabs'>
        {/* 승인 대기 프로젝트 탭 */}
        <ul>
          <li
            className={`tab ${currTab === 'funding' ? 'active' : ''}`}
            onClick={() => handleTabClick('funding')}
          >
            펀딩 프로젝트
          </li>
          <li
            className={`tab ${currTab === 'made' ? 'active' : ''}`}
            onClick={() => handleTabClick('made')}
          >
            제작 프로젝트
          </li>
          <li
            className={`tab ${currTab === 'like' ? 'active' : ''}`}
            onClick={() => handleTabClick('like')}
          >
            관심 프로젝트
          </li>
          <li
            className={`tab ${currTab === 'userProfileModify' ? 'active' : ''}`}
            onClick={() => handleTabClick('userProfileModify')}
          >
            회원정보 수정
          </li>
        </ul>
      </div>

      {/* 선택된 탭에 따라 내용을 표시 */}
      
      <div className='mypageContainer'>
        {currTab === 'funding' ? (<FundingProject />):(
          currTab === 'made' ? (<MadeProject />) : (
            currTab === 'like' ? (<LikeProject />) : (<UserProfileModify />)
          )
        )}
      </div>

    </div>
  );
}