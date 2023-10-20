import React from 'react';
import { useLocation } from 'react-router-dom';

const ProjectPay = () => {
    // useLocation 훅을 사용하여 전달된 데이터 받기
    const location = useLocation();
    const { selectedRewards } = location.state || {};

    return (
        <div>
            <h2>선택한 리워드 목록</h2>
            <ul>
                {selectedRewards && selectedRewards.length > 0 ? (
                    selectedRewards.map((selectedReward, index) => (
                        <li key={index}>
                            <div>그룹: {selectedReward.projRewardName}</div>
                            <div>금액: {selectedReward.projRewardAmount} 원</div>
                            <div>잔여 수량: {selectedReward.projRewardCount}</div>
                        </li>
                    ))
                ) : (
                    <p>선택한 리워드가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default ProjectPay;
