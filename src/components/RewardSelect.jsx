// 상품 리워드 전체 목록을 셀렉트 형식으로 볼 수 있는 컴포넌트
// 선택한 리워드는 바로 아래에 추가되고, 중복 선택해도 추가되지 않음
// x로 선택한 리워드를 제거가능, 선택한 리워드의 금액은 하단에 계산됨
// 에러 없음

import React, { useState, useRef, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import './RewardSelect.css'

const RewardSelect = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRewards, setSelectedRewards] = useState([]);
  const [heartClicked, setHeartClicked] = useState(false);
  const [clickedCount, setClickedCount] = useState(0);

  const toggleHeart = () => {
    if (heartClicked) {
      setHeartClicked(false);
      setClickedCount(clickedCount - 1);
    } else {
      setHeartClicked(true);
      setClickedCount(clickedCount + 1);
    }
  };

  const ProjectData = useFetch(
    'https://json-server-vercel-sepia-omega.vercel.app/projects'
  );

  const modalRef = useRef(null);
  const backgroundAreaRef = useRef(null);

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

  const formatAmount = (amount) => {
    return amount.toLocaleString();
  };

  const calculateTotalAmount = () => {
    return selectedRewards.reduce(
      (total, reward) => total + reward.projRewardAmount,
      0
    );
  };

  const handleRewardSelect = (reward) => {
    if (
      !selectedRewards.some((r) => r.projRewardName === reward.projRewardName)
    ) {
      setSelectedRewards([...selectedRewards, reward]);
    }
    setShowModal(false); // 리스트가 선택되면 모달 닫기
  };

  const handleRewardRemove = (rewardToRemove) => {
    const updatedRewards = selectedRewards.filter(
      (reward) => reward !== rewardToRemove
    );
    setSelectedRewards(updatedRewards);
  };

  return (
    <div className='backgroundArea' ref={backgroundAreaRef}>
      <button
        onClick={() => setShowModal(!showModal)}
        className='reward-button'
      >
        <span className='reward-text'>
          {showModal ? '리워드를 선택해주세요.' : '리워드 선택하기'}
        </span>{' '}
        <span className='arrow'>{showModal ? '▲' : '▼'}</span>
      </button>
      {showModal && (
        <div className='modal' ref={modalRef} style={{ width: '350px' }}>
          <div className='modal-content'>
            <ul className='no-bullets'>
              {ProjectData.map((project, projectIndex) => (
                <li key={project.proj_id}>
                  {project.projReward.map((reward, index) => (
                    <div key={index}>
                      <button
                        onClick={() => handleRewardSelect(reward)}
                        className='selectButton'
                      >
                        <table className='firstTable'>
                          <tr>
                            <td>리워드 </td>
                            <td> : {reward.projRewardName}</td>
                          </tr>
                          <tr>
                            <td>금액 </td>
                            <td> : {formatAmount(reward.projRewardAmount)}</td>
                          </tr>
                          <tr>
                            <td>갯수 </td>
                            <td> : {reward.projRewardCount}</td>
                          </tr>
                        </table>
                      </button>
                      {projectIndex !== ProjectData.length - 1 ||
                        index !== project.projReward.length - 1 ? (
                        <hr />
                      ) : null}
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedRewards.length > 0 && (
        <div>
          <h2 className="selected-reward-header">선택한 리워드 :</h2>
          <ul className="no-bullets2">
            {selectedRewards.map((selectedReward, index) => (
              <li
                key={index}
                className={index >= 0 && index <= 100 ? 'second-table' : ''}
              >
                <table>
                  <tr>
                    <td>리워드</td>
                    <td>: {selectedReward.projRewardName}</td>
                    <td className='button-cell'>
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
                  <tr>
                    <td>갯수</td>
                    <td>: {selectedReward.projRewardCount}</td>
                  </tr>
                </table>
                {index !== selectedRewards.length - 1 ? <hr /> : null}
              </li>
            ))}
          </ul>
          <div className='total-amount'>
            <h3>총 금액 : {formatAmount(calculateTotalAmount())} 원</h3>
          </div>
        </div>
      )}

      <div className='button-container'>
        <button className='fundingBtn'>신청하기</button>
        <div className='button-group'>
          <button
            className={`heartBtn ${heartClicked ? 'clicked' : ''}`}
            onClick={toggleHeart}
          >
            {heartClicked ? '❤️' : '🤍'} {heartClicked ? clickedCount : ''}
          </button>
          <button className='shareBtn' style={{ marginLeft: '20px' }}>
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardSelect;
