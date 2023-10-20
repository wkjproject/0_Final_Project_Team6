import React, { useState, useRef, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom'; // 추가된 import
import './RewardSelect.css'
import { Link } from 'react-router-dom';

const RewardSelect = () => {
  // 상태 변수 초기화
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [selectedRewards, setSelectedRewards] = useState([]); // 선택한 리워드 목록
  const [heartClicked, setHeartClicked] = useState(false); // 하트 클릭 여부
  const [clickedCount, setClickedCount] = useState(0); // 하트 클릭 수


  // React Router의 useLocation 훅을 사용하여 현재 위치 가져오기
  const location = useLocation();
  const { _id } = location.state || {};

  // 하트 클릭 토글 함수
  const toggleHeart = () => {
    if (heartClicked) {
      setHeartClicked(false);
      setClickedCount(clickedCount - 1);
    } else {
      setHeartClicked(true);
      setClickedCount(clickedCount + 1);
    }
  };

  // useRef를 사용하여 모달 및 배경 영역의 참조 생성
  const modalRef = useRef(null);
  const backgroundAreaRef = useRef(null);

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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleApplyClick = () => {
    if (selectedRewards.length === 0) {
      alert("선택한 그룹이 없습니다. 그룹을 선택하세요.");
    } else {
      navigate('/projectPay', {
        state: { data: selectedRewards, data2: { projName } },
      });
    }
  }


  // API를 사용하여 프로젝트 데이터 가져오기
  const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects");

  // 데이터 로딩 중이면 "Loading..." 표시
  if (!projectData) {
    return <div>Loading...</div>;
  }

  // 선택한 프로젝트 찾기
  const selectedProject = projectData.find(item => item.proj_id === _id);

  // 프로젝트가 없으면 "Project not found" 표시
  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  // 프로젝트 정보 추출
  const { projName, projPlace, projAddr, projDate, projStatus } = selectedProject;
  console.log(`프로젝트 상태 : ${projStatus}`)

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

        <div className='projDate'>{/* 맵 함수는 배열 구조의 데이터를 한줄씩 출력 */}
          {projDate.map((item, index) => (
            <div key={index}>
              {item}
            </div>
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
          <span className='reward-text'>
            {showModal ? '그룹을 선택해주세요.' : '그룹 선택하기'}
          </span>{' '}
          <span className='arrow'>{showModal ? '▲' : '▼'}</span>
        </button>
        {showModal && (
          <div className='modal' ref={modalRef} >
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
                            <td style={{ paddingTop: '5px' }}> : {reward.projRewardCount}</td>
                          </tr>
                        </table>
                      </button>
                      {index !== selectedProject.projReward.length - 1 && <hr />}
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
          <h2 className="selected-reward-header">선택한 그룹 :</h2>
          <ul className="no-bullets2" >
            {selectedRewards.map((selectedReward, index) => (
              <li
                key={index}
                className={index >= 0 && index <= 100 ? 'second-table' : ''}
                style={{ marginTop: '10px' }}
              >
                <table >
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
                    <td style={{ paddingTop: '5px' }}>: {selectedReward.projRewardCount}</td>
                  </tr>
                </table>
              </li>
            ))}
          </ul>
          <div className='total-amount'>
            <h3>총 금액 : {formatAmount(calculateTotalAmount())} 원</h3>
          </div>
        </div>
      )
      }

      {/* 신청하기, 하트, 공유하기 버튼 */}
      <div className='button-container'>
        {projStatus == 1 ? (
          <div>
            <button className='fundingBtn' onClick={handleApplyClick}>신청하기</button>
            <div className='button-group'>
              <button
                className={`heartBtn ${heartClicked ? 'clicked' : ''}`}
                onClick={toggleHeart}
              >
                {heartClicked ? '❤️' : '🤍'} {heartClicked ? clickedCount : '0'}
              </button>
              <button className='shareBtn' style={{ marginLeft: '20px' }}>
                공유하기
              </button>
            </div>
          </div>
        ) : projStatus == 2 ? (
          <div className='closed-project-message'>
            마감된 프로젝트입니다.
          </div>
        ) : (
          <div className='other-status-message'>
            ERROR
          </div>
        )}
      </div>

    </div>
  );
};

export default RewardSelect;