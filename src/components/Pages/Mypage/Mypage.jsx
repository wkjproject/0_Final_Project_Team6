import React, { useEffect, useState } from 'react';
import '../../../css/ManageProj.css';
import ProjectCard from '../ProjectCard';
import Endpoint from '../../../config/Endpoint';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../../css/Mypage/Mypage.css';

export default function Mypage() {
  // 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.auth.auth.userId)
  // 펀딩프로젝트는 fundings 컬렉션에서 user_id가 현재 리덕스 userId랑 일치하는것만 가져와서 project_id 와 projects 컬렉션의 proj_id가 일치하는것만 뿌림
  // 펀딩프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projPlace // fundings 의 rewards 갯수로 map 돌려서 반복
  const [fundings, setFundings] = useState();
  const [fundingProject, setFundingProject] = useState();
  
  // 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);

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
  console.log(fundings)
  console.log(fundingProject);
  return (
    <div>
      <h1>홍길동</h1>
      {/* 프로젝트 탭 */}
      <div className='tabs'>
        {/* 승인 대기 프로젝트 탭 */}
        <ul>
          <li
          >
            펀딩 프로젝트
          </li>
          <li
          >
            제작 프로젝트
          </li>
          <li
          >
            관심 프로젝트
          </li>
          <li
          >
            회원정보 수정
          </li>
        </ul>
      </div>

      {/* 선택된 탭에 따라 내용을 표시 */}
      
      <div className='project-container'>
        {mount && fundingProject.map((projectArray, index) => {
          const funding = fundings[index]
          return projectArray.map((proj) => (
          <ProjectCard
            key={proj.projName}
            projId={proj.proj_id}
            image={proj.projMainImgPath}
            MypageImageClass={'fundingProjectImg'}
            MypageDivClass={'fundingProjectText'}
            MypageDivContent={funding.fundingStatus === 0 ? '대기' : funding.fundingStatus === 1 ? '확정' : ''}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
          />
          ))
        })}
      </div>

    </div>
  );
}
