import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectPay.css';
import { useSelector } from 'react-redux';

const ProjectPay = () => {
    const location = useLocation();
    const location2 = useLocation();
    const selectedRewards = location.state.data;
    const projectInfo = location2.state.data2;
    const rewardsArray = selectedRewards;
    console.log(location);

    // 숫자를 세 자리마다 쉼표(,)를 추가하는 함수
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const userName = useSelector((state) => state.userName.userName); // 로그인한 userName
    const userAddr = useSelector((state) => state.userAddr.userAddr); // 로그인한 userAddr
    const userPhoneNum = useSelector((state) => state.userPhoneNum.userPhoneNum); // 로그인한 userPhoneNum
    console.log(`userAddr: ${userAddr}`);
    console.log(`userName: ${userName}`);
    console.log(`userPhoneNum: ${userPhoneNum}`);

    return (
        <div className='payDiv'>
            <br />
            <div className='payList'>
                <div className='a'>
                    <div className='payHeader'>
                        결제 정보
                    </div>
                    <div className='payInfo'>
                        <div>
                            <div className='payInfoHeader'>모임/행사 정보</div>
                            <hr className='payHr' />
                            <div className='paddingtop'>
                                <div className='projName2'>
                                    {projectInfo.projName}
                                    <br />
                                </div>
                                <div className='projAddr'>
                                    {projectInfo.projAddr}
                                    <br />
                                </div>
                                <div className='projPlace'>
                                    {projectInfo.projPlace}
                                    <br />
                                </div>
                                <div className='projDate'>
                                    {projectInfo.projDate.map((item, index) => (
                                        <div kay={index}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='payGroup'>
                        <div className='payGroupHeader'>선택한 그룹</div>
                        <hr className='payHr' />
                        <br />
                        <ul className='payUl'>
                            {rewardsArray.map((reward, index) => (
                                <li key={index} className='payLi'>
                                    <table className='payTable'>
                                        <tr>
                                            <td>그룹</td>
                                            <td>:</td>
                                            <td>{reward.projRewardName}</td>
                                        </tr>
                                        <tr>
                                            <td>금액</td>
                                            <td>:</td>
                                            <td>{addCommasToNumber(reward.projRewardAmount)}원</td>
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
                    <div className='payPerson'>
                        <div className='payPersonHeader'>신청자 정보</div>
                        <hr className='payHr' />
                        <br />
                        <div>
                            {userName}
                            <br />
                            {userAddr}
                            <br />
                            {userPhoneNum}
                        </div>
                    </div>
                </div>
                <div className='b'>
                    <div className='payHeader2'>
                        결제확인
                    </div>
                    <div className='payCheck'>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectPay;
