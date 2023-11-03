// 승인대기 프로젝트 --> 승인하기 or 거절하기 선택가능 컴포넌트

import React, { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // 리덕스 액션쪽으로 데이터 보내기
import { ToastContainer, toast } from 'react-toastify';
import { setProjStatus } from './../../../redux/reducer/projStatusAction';
import { useSelector } from 'react-redux';

import './ApprProj.css';
import Endpoint from '../../../config/Endpoint';
import { useProjectsApi } from '../../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

export default function ApprProj() {
  const navigate = useNavigate();

  /* -----  (전체)projStatus 받아오는 부분 ----- */
  // const [projStatusState, setProjStatusState] = useState([]);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const endpoint = Endpoint();
  //   axios.get(`${endpoint}/projStatus`)
  //   .then((res) => {
  //     dispatch(setProjStatus(res.data.projStatus));
  //     setProjStatusState(res.data.projStatus);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // },[dispatch]);
  // const projStatus = useSelector((state)=> state.projStatus.projStatus);

  // React Router의 useLocation 훅을 사용하여 현재 위치 가져오기
  const location = useLocation();
  const { _id } = location.state || {};
     // 몽고DB
  const { projects } = useProjectsApi();
    const {
        data: projectData,
        } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projects.getProjects(),
    });
  // 데이터 처리 부분
/*   const projectData = useFetch(
    'https://json-server-vercel-sepia-omega.vercel.app/projects'
  ); // API를 사용하여 프로젝트 데이터 가져오기 */
  const selectedProject = projectData.find((item) => item.proj_id === _id); // 선택한 프로젝트 찾기

  if (!selectedProject) {
    // 만약 selectedProject가 없을 경우, 에러를 방지하기 위한 처리
    return <div>Loading...</div>; // 또는 다른 처리를 수행
  }

  const { proj_id, projName, projPlace, projAddr, projDate, projStatus } =
    selectedProject; // 프로젝트 정보 추출
  const endpoint = Endpoint();
  const customId = "custom-id-yes";
  const ApproveProj = async (proj_id) => {
    // 프로젝트 승인: '승인하기'를 누르면 : projStatus가 0 --> 1
    await axios
      .post(`${endpoint}/newProjStatus`, { proj_id, projStatus: 1 })
      .then((res) => {
        if (res.data.newProjStatusSuccess) {
          toast(`프로젝트가 승인되었습니다.`, {toastId: customId});
          navigate('/manageProj');
          // window.location.reload();
        }
        if (!res.data.newProjStatusSuccess) {
          toast(res.data.message);
        }
      });
  };

  const RejectProj = async (proj_id) => {
    // 프로젝트 승인 거절: '거절하기'를 누르면 : projStatus가 0 --> 3
    await axios
      .post(`${endpoint}/newProjStatus`, { proj_id, projStatus: 3 })
      .then((res) => {
        if (res.data.newProjStatusSuccess) {
          toast(`프로젝트가 거절되었습니다.`, { toastId: customId});
          navigate('/manageProj');
          // window.location.reload();
        }
        if (!res.data.newProjStatusSuccess) {
          toast(res.data.message);
        }
      });
  };

  return (
    <div className='backgroundArea'>
      <div className='info'>
        <div className='projName'>
          {projName}
          <br />
        </div>
        <div className='projAddr'>
          {projAddr}
          <br />
        </div>
        <div className='projPlace'>
          {projPlace}
          <br />
        </div>

        <div className='projDate'>
          {/* 맵 함수는 배열 구조의 데이터를 한줄씩 출력 */}
          {projDate.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
          <br />
        </div>
      </div>

      {/* 프로젝트 승인, 반려, 보류 버튼 */}
      <div className='buttons-container'>
        <button className='apprBtn' onClick={() => ApproveProj(proj_id)}>
          프로젝트 승인
        </button>
        <div className='buttons-group'>
          <button className='rejectBtn' onClick={() => RejectProj(proj_id)}>
            프로젝트 승인 거절
          </button>
          <button className='holdBtn' onClick={() => navigate(-1)}>
            보류
          </button>
        </div>
      </div>
    </div>
  );
}
