import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Endpoint from '../../../config/Endpoint';
import axios from 'axios';
import ProjectCard from '../ProjectCard';

export default function LikeProject() {
	const endpoint = Endpoint();
	// Like프로젝트는 리덕스의 userId를 가져와서 userprojects에서 
	// 해당 users_id에서 userLikeProject를 가져와 projects 에서 userLikeProject와 proj_id가 같은걸 가져옴
	// 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.userData.userData.userId)
	// 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);
	// likeProject에 서버로부터 받아온 값 넣어주기
  const [likeProject, setLikeProject] = useState();
	useEffect(() => {
    if (!mount) {
      const endpoint = Endpoint();
      const LikeProjectData = async () => {
        try {
          const res = await axios.post(`${endpoint}/likeProject`, {
            user_id
          });
          setLikeProject(res.data.likes);
          setMount(true);
        } catch (err) {
          console.log(err);
        }
      }

      LikeProjectData();
    }
  }, []);

	const cancelLike = async (evt, proj_id) => {
		evt.preventDefault();
		try {
			await axios.post(`${endpoint}/cancelLike`, {
				user_id,
				proj_id
			})
      const res = await axios.post(`${endpoint}/likeProject`, {
      user_id
      });
      setLikeProject(res.data.likes);
		} catch(err) {
			console.log('cancelLike', err)
		}
	}
	    /* --- 페이지 이동(pagination) 설정 --- */
  const [currPage, setCurrPage] = useState(1);

  const projectPerPage = 6;

  const totalPages = likeProject ? Math.ceil(likeProject.length / projectPerPage): '';
  const startIndex = (currPage - 1) * projectPerPage;
  const endIndex = startIndex + projectPerPage;
  const displayedProjectsList = likeProject ? likeProject.slice(startIndex, endIndex): '';

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
            image={proj.projMainImgPath}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
						MypageDivContent={'❤️'}
						MypageDivClass={'LikeProjectImg'}
						cancelLike={(evt) => cancelLike(evt, proj.proj_id)}
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