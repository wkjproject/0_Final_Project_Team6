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
  console.log(madeProject)
	return (
		<>
    {mount && madeProject.map((proj, index) => (          
          <ProjectCard
            key={proj.projName}
            projId={proj.proj_id}
            projStatus={proj.projStatus}
            image={proj.projMainImgPath}
            title={proj.projName}
            location={proj.projAddr.split(' ', 2)[1]}
            dday={proj.projDate}
            price={proj.projReward[0].projRewardAmount}
          />)

    )}
    </>
	)
}
