import React from 'react';
import { useLocation } from 'react-router-dom';

const ProjectPay = () => {
    // 사용할 데이터를 location에서 추출
    const location = useLocation();
    const { state } = location;

    if (!state || !state.selectedRewards) {
        // 데이터가 없거나 selectedRewards가 없을 경우 처리
        console.error("No data or selectedRewards is missing");
        return null; // 또는 오류 처리 방법에 따라 다른 동작을 수행
    }

    // state 객체에서 전달된 데이터 추출
    const selectedRewards = state && state.selectedRewards;

    // 이제 selectedRewards 변수를 사용하여 데이터를 화면에 출력하거나 다른 작업을 수행할 수 있습니다.

    return (
        <div>
            <h1>Project Pay Page</h1>
            <div>
                <h2>선택한 리워드:</h2>
                <ul>
                    {selectedRewards.map((reward, index) => (
                        <li key={index}>
                            <p>그룹: {reward.projRewardName}</p>
                            <p>금액: {reward.projRewardAmount} 원</p>
                            <p>잔여 수량: {reward.projRewardCount}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* 다른 내용 및 렌더링을 이어서 작성할 수 있습니다. */}
        </div>
    );
};

export default ProjectPay;
