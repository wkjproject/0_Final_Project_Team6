import React, { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // 추가된 import
import './RewardSelect.css';
import { useSelector } from 'react-redux';
import { useProjectsApi } from '../../../context/ProjectsApiContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Endpoint from '../../../config/Endpoint';
import { toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';


const RewardSelect = () => {
  // 외부를 클릭했을 때 모달 닫기 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        backgroundAreaRef.current &&
        !backgroundAreaRef.current.contains(event.target)
      ) {
        setShowModal(false);
      }
    };
    // _id(proj_id)와 userId 를 post로 보내서 해당 유저가 현재 proj_id를 좋아요 눌렀는지 확인
    const userHeartClicked = async () => {
      try {
        await axios
          .post(`${endpoint}/userHeartClicked`, {
            userId,
            _id,
          })
          .then((res) => {
            if (res.data.Success) {
              setHeartClicked(true);
            } else {
              setHeartClicked(false);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    userHeartClicked();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // 몽고DB 연결
  const { projects } = useProjectsApi();
  const { data: projectData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projects.getProjects(),
  });

  //console.log(`프로젝트 상태 : ${projStatus}`)
  //console.log(`하트수 : ${projLike}`)

  // 상태 변수 초기화
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedRewards, setSelectedRewards] = useState([]); // 선택한 리워드 목록
  const [heartClicked, setHeartClicked] = useState(false); // 하트 클릭 여부

  const customId1 = 'msg-id-opening1';
  const customId2 = 'msg-id-opening2';
  const customId3 = 'msg-id-opening3';
  const customStyle = {
    whiteSpace: 'pre-line'
  };

  // 리덕스에서 로그인 상태 확인
  const isLogin = useSelector((state) => state.auth.auth.isLogin);

  // 리덕스에서 userId 가져오기
  const userId = useSelector((state) => state.userData.userData.userId);

  // 리덕스에서 관리자여부 가져오기
  const isAdmin = useSelector((state) => state.userData.userData.isAdmin);

  // React Router의 useLocation 훅을 사용하여 현재 위치 가져오기
  const { projectId } = useParams();
  const _id = Number(projectId);

  const endpoint = Endpoint();

  // 선택한 프로젝트 찾기
  const selectedProject = projectData.find((item) => item.proj_id === _id);
  // 프로젝트 정보 추출
  const { projName, projPlace, projAddr, projDate, projStatus, projLike } =
    selectedProject;

  const initialClickedCount = selectedProject ? selectedProject.projLike : 0;
  const [clickedCount, setClickedCount] = useState(initialClickedCount); // 하트 클릭 수

  // 하트 클릭 토글 함수, 클릭하면 DB에 저장
  const toggleHeart = () => {
    if (heartClicked) {
      setHeartClicked(false);
      setClickedCount(clickedCount - 1);
      axios.post(`${endpoint}/heartClicked`, {
        _id,
        userId,
        heartStatus: 0,
      });
    } else {
      setHeartClicked(true);
      setClickedCount(clickedCount + 1);
      axios.post(`${endpoint}/heartClicked`, {
        _id,
        userId,
        heartStatus: 1,
      });
    }
    const updatedProjLike =
      (projLike !== null ? projLike : 0) + (heartClicked ? 0 : 1);
    setClickedCount(updatedProjLike);
  };

  // useRef를 사용하여 모달 및 배경 영역의 참조 생성
  const modalRef = useRef(null);
  const backgroundAreaRef = useRef(null);

  // 금액을 숫자 형식으로 포맷하는 함수
  const formatAmount = (amount) => {
    return amount.toLocaleString();
  };

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 얻기

  // 선택한 리워드들의 총 금액을 계산하는 함수
  const calculateTotalAmount = () => {
    return selectedRewards.reduce(
      (total, reward) => total + reward.projRewardAmount,
      0
    );
  };

  // 리워드 선택 처리 함수
  const handleRewardSelect = (reward) => {
    if (!selectedRewards.some((r) => r.projRewardName === reward.projRewardName)) {
      if (reward.projRewardAvailable === 0) {
        toast('잔여 수량이 없습니다.', {
          toastId: customId1
        })
        return;
      }
      setSelectedRewards([...selectedRewards, reward]);
    }
    setShowModal(false); // 리스트가 선택되면 모달 닫기
  };

  // 선택한 리워드 제거 처리 함수
  const handleRewardRemove = (rewardToRemove) => {
    const updatedRewards = selectedRewards.filter(
      (reward) => reward !== rewardToRemove
    );
    setSelectedRewards(updatedRewards);
  };

  // API를 사용하여 프로젝트 데이터 가져오기
  /* const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); */

  // 데이터 로딩 중이면 "Loading..." 표시
  if (!projectData) {
    return <div>Loading...</div>;
  }

  // 프로젝트가 없으면 "Project not found" 표시
  if (!selectedProject) {
    return (
      <div>
        <img src='/Image20231031143853.gif' alt='로딩 이미지' />
      </div>
    );
  }

  const currentURL = window.location.href;

  const handleCopy = () => {
    toast('URL이 클립보드에 복사되었습니다: \n' + currentURL, {
      toastId: customId3,
      style: customStyle
    });
  };


  const handleApplyClick = () => {
    if (selectedRewards.length === 0) {
      toast("선택한 그룹이 없습니다. \n그룹을 선택하세요.", {
        toastId: customId2,
        style: customStyle
      });
    } else {
      if (isLogin) {
        navigate('/projectPay', {
          state: {
            data: selectedRewards,
            data2: { projName, projPlace, projAddr, projDate, _id },
          },
        });
      } else {
        const userConfirmed = window.confirm(
          '로그인이 필요한 서비스입니다. \n로그인 페이지로 이동할까요?'
        );
        if (userConfirmed) {
          navigate('/login');
        }
      }
    }
  };

  // 펀딩현황 혹은 수정 눌렀을때
  const moveToPage = (evt, moveWhere) => {
    evt.preventDefault();
    navigate(moveWhere, { state: { _id: _id } });
  };

  // 컴포넌트 렌더링
  return (
    <div className='backgroundArea' ref={backgroundAreaRef}>
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
      {/* 리워드 선택 모달 */}
      <div className={`rewardBtnBorder ${showModal ? 'border-active' : ''}`}>
        <button
          onClick={() => setShowModal(!showModal)}
          className='reward-button'
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className='reward-text'>
              {showModal ? '그룹을 선택해주세요.' : '그룹 선택하기'}
            </span>{' '}
            <span className='arrow'>{showModal ? '∧' : '∨'}</span>
          </div>
        </button>
        {showModal && (
          <div className='modal' ref={modalRef}>
            <div className='modal-content'>
              <ul className='no-bullets'>
                <li key={selectedProject.proj_id}>
                  {selectedProject.projReward.map((reward, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleRewardSelect(reward)}
                        className='selectButton'
                      >
                        <table className='firstTable'>
                          <tbody>
                            <tr>
                              <td>그룹 </td>
                              <td> : {reward.projRewardName}</td>
                            </tr>
                            <tr>
                              <td style={{ paddingTop: '5px' }}>금액 </td>
                              <td style={{ paddingTop: '5px' }}> : {formatAmount(reward.projRewardAmount)} 원</td>
                            </tr>
                            <tr>
                              <td style={{ paddingTop: '5px' }}>잔여 수량 </td>
                              <td style={{ paddingTop: '5px' }}> : {reward.projRewardAvailable}</td>
                            </tr>
                          </tbody>
                        </table>
                      </button>
                      {index !== selectedProject.projReward.length - 1 && (
                        <hr />
                      )}
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 선택한 리워드 목록 표시 */}
      {selectedRewards.length > 0 && (
        <div className='selectedReward'>
          <h2 className='selected-reward-header'>선택한 그룹 :</h2>
          <ul className='no-bullets2'>
            {selectedRewards.map((selectedReward, index) => (
              <li
                key={index}
                className={index >= 0 && index <= 100 ? 'second-table' : ''}
                style={{ marginTop: '10px' }}
              >
                <table >
                  <tbody>
                    <tr>
                      <td>그룹</td>
                      <td>: {selectedReward.projRewardName}</td>
                      <td className='button-cell' >
                        <button
                          className='remove-button'
                          onClick={() => handleRewardRemove(selectedReward)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>금액</td>
                      <td>
                        : {formatAmount(selectedReward.projRewardAmount)} 원
                      </td>
                    </tr>
                    <tr >
                      <td style={{ paddingTop: '5px' }}>잔여 수량</td>
                      <td style={{ paddingTop: '5px' }}>: {selectedReward.projRewardAvailable}</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            ))}
          </ul >
          <div className='total-amount'>
            <h3>총 금액 : {formatAmount(calculateTotalAmount())} 원</h3>
          </div>
        </div >
      )}

      {/* 신청하기, 하트, 공유하기 버튼 */}
      <div className='button-container'>
        {projStatus === '1' ? (
          <div>
            <button className='fundingBtn' onClick={handleApplyClick}>
              신청하기
            </button>
            <div className='button-group'>
              <button
                className={`heartBtn ${heartClicked ? 'clicked' : ''}`}
                onClick={toggleHeart}
              >
                {heartClicked ? <svg viewBox="0 0 32 32" focusable="false" role="presentation" className="withIcon_icon__3VTbq" aria-hidden="true"><path d="M22.16 4h-.007a8.142 8.142 0 0 0-6.145 2.79A8.198 8.198 0 0 0 9.76 3.998a7.36 7.36 0 0 0-7.359 7.446c0 5.116 4.64 9.276 11.6 15.596l2 1.76 2-1.76c6.96-6.32 11.6-10.48 11.6-15.6v-.08A7.36 7.36 0 0 0 22.241 4h-.085z"></path></svg> : <svg viewBox="0 0 32 32" focusable="false" role="presentation" className="withIcon_icon__3VTbq" aria-hidden="true"><path d="M22.16 4h-.007a8.142 8.142 0 0 0-6.145 2.79A8.198 8.198 0 0 0 9.76 3.998a7.36 7.36 0 0 0-7.359 7.446c0 5.116 4.64 9.276 11.6 15.596l2 1.76 2-1.76c6.96-6.32 11.6-10.48 11.6-15.6v-.08A7.36 7.36 0 0 0 22.241 4h-.085zm-5.28 21.84l-.88.8-.88-.8h-.08C8.4 19.76 4 15.84 4 11.44l-.001-.082A5.76 5.76 0 0 1 9.928 5.6a6.542 6.542 0 0 1 4.865 2.232l.486.567h1.52l.48-.56a6.548 6.548 0 0 1 4.877-2.24l.084-.001a5.76 5.76 0 0 1 5.76 5.76l-.001.085c0 4.396-4.4 8.316-11.12 14.396z"></path></svg>} {heartClicked ? clickedCount : projLike}
              </button >
              <CopyToClipboard text={currentURL} onCopy={handleCopy}>
                <button className='shareBtn' style={{ marginLeft: '20px' }} >
                  공유하기
                </button>
              </CopyToClipboard>
            </div >
            {/* 펀딩현황 버튼 추가 */}
            {/* 관리자 or 리덕스 userId 와 projects 컬렉션(selectedProject)의 userMade_id가 일치할때 펀딩현황, 수정 버튼 보이도록 */}
            {
              isAdmin || userId === selectedProject.userMade_id ? (
                <div className='fundStatusContainer'>
                  <button
                    className='fundStatusBtn'
                    onClick={(evt) => moveToPage(evt, '/fundingStatus')}
                  >
                    펀딩현황
                  </button>
                  <button
                    className='fundStatusBtn'
                    onClick={(evt) => moveToPage(evt, '/modifyProj')}
                  >
                    수정
                  </button>
                </div>
              ) : (
                ''
              )
            }
          </div >
        ) : projStatus === '2' ? (
          <div className='closed-project-message'>마감된 프로젝트입니다.</div>
        ) : (
          <div className='other-status-message'>ERROR</div>
        )}
      </div >
    </div >
  );
};

export default RewardSelect;
