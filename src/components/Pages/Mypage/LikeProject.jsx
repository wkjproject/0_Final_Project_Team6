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
	console.log(likeProject)
	return (
		<>
    {mount && likeProject.map((proj, index) => (          
          <ProjectCard
            key={proj.projName}
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
    </>
	)
}