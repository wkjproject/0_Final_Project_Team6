import React, { useEffect, useState } from 'react';
import '../../../css/ManageProj.css';
import ProjectCard from '../ProjectCard';
import Endpoint from '../../../config/Endpoint';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MadeProject() {
	// 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.userData.userData.userId)
  // 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);

  // madeProject에 서버로부터 받아온 값 넣어주기
  const [madeProject, setMadeProject] = useState();
	// 제작프로젝트는 현재 리덕스의 userId와 projects 컬렉션의 userMade_id 랑 일치하는 값만 가져오면됨
  // 제작프로젝트에서 필요한 데이터는 projects 의 projName, projAddr, projReward[0]
	  useEffect(() => {
    const endpoint = Endpoint();
    const MadeProjectData = async () => {
      try {
        await axios.post(`${endpoint}/madeProject`, {
          user_id
        }).then((res) => {
          setMadeProject(res.data.mades);
          setMount(true);

        })
      } catch (err) {
        console.log(err);
      }
    }

    MadeProjectData();
  }, []);
    /* --- 페이지 이동(pagination) 설정 --- */
  const [currPage, setCurrPage] = useState(1);

  const projectPerPage = 6;

  const totalPages = madeProject ? Math.ceil(madeProject.length / projectPerPage): '';
  const startIndex = (currPage - 1) * projectPerPage;
  const endIndex = startIndex + projectPerPage;
  const displayedProjectsList = madeProject ? madeProject.slice(startIndex, endIndex): '';

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
    {mount && displayedProjectsList.map((proj, index) => (          
          <ProjectCard
            key={proj.proj_id}
            projId={proj.proj_id}
            projStatus={proj.projStatus}
            MypageImageClass={proj.projStatus === '0' || proj.projStatus === '1' ? 'fundingProjectImg' : 'fundingProjectImgX'}
            MypageDivContent={proj.projStatus === '0' ? '대기' : proj.projStatus === '1' ? '승인' : proj.projStatus === '3' ? '반려' : proj.projStatus === '2' ? '마감' : ''}
            MypageDivClass={proj.projStatus === '0' ? 'fundingProjectTextWait' : proj.projStatus === '1' ? 'fundingProjectTextConfirm' : proj.projStatus === '3' ? 'fundingProjectRefuse' : proj.projStatus === '2' ? 'fundingProjectClosed' : ''}
            image={proj.projMainImgPath}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
          />)
    )}
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
	)
}
