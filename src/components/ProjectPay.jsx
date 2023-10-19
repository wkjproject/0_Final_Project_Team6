import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectPay.css';

const ProjectPay = () => {
    const location = useLocation();
    const location2 = useLocation();
    const selectedRewards = location.state.data;
    const projectInfo = location2.state.data2;
    const rewardsArray = selectedRewards;
    console.log(location);

    return (
        <div>
            <div className='payHeader'>결제 정보</div>
            <br />
            <div className='payList'>
                <div>
                    {rewardsArray.map((reward, index) => (
                        <div key={index}>
                            {reward.projName}
                        </div>
                    ))}
                </div>
                <h2>선택한 그룹 :</h2>
                <br />
                <ul className='payUl'>
                    {rewardsArray.map((reward, index) => (
                        <li key={index}>
                            <table className='payTable'>
                                <tr>
                                    <td>그룹</td>
                                    <td>:</td>
                                    <td>{reward.projRewardName}</td>
                                </tr>
                                <tr>
                                    <td>금액</td>
                                    <td>:</td>
                                    <td>{reward.projRewardAmount}원</td>
                                </tr>
                                <tr>
                                    <td>남은 수량</td>
                                    <td>:</td>
                                    <td>{reward.projRewardCount}</td>
                                </tr>
                            </table>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectPay;
