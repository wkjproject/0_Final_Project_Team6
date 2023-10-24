import React, { useState } from 'react';
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
    const userMail = useSelector((state) => state.userMail.userMail); // 로그인한 userName
    const userAddr = useSelector((state) => state.userAddr.userAddr); // 로그인한 userAddr
    const userPhoneNum = useSelector((state) => state.userPhoneNum.userPhoneNum); // 로그인한 userPhoneNum
    //console.log(`userAddr: ${userAddr}`);
    //console.log(`userName: ${userName}`);
    //console.log(`userPhoneNum: ${userPhoneNum}`);

    const totalAmount = rewardsArray.reduce((total, reward) => total + reward.projRewardAmount, 0);

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const handleCheckboxChange1 = (event) => {
        const isChecked = event.target.checked;
        setChecked1(isChecked);
        setChecked2(isChecked);
        setChecked3(isChecked);
    };

    const handlePayment = () => {
        // 2번째와 3번째 체크박스가 모두 체크되지 않았을 때 확인 메시지 표시
        if (!isChecked2) {
            const confirmResult = window.confirm("구매조건, 결제 진행 및 결제 대행 서비스 동의가 필요합니다\n동의 하시겠습니까?");
            if (confirmResult) {
                setChecked2(true);
            }
        } else if (!isChecked3) {
            const confirmResult = window.confirm("개인정보 제3자 제공 동의가 필요합니다\n동의 하시겠습니까?");
            if (confirmResult) {
                setChecked3(true);
            }
        }
        else {
            alert("결제 페이지 이동 예정")
            // 결제 로직 실행
        }
    };

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
                            <table className='payPersonTable'>
                                <tr>
                                    <td>이름</td>
                                    <td>:</td>
                                    <td>{userName}</td>
                                </tr>
                                <tr>
                                    <td>메일</td>
                                    <td>:</td>
                                    <td>{userMail}</td>
                                </tr>
                                <tr>
                                    <td>주소</td>
                                    <td>:</td>
                                    <td>{userAddr}</td>
                                </tr>
                                <tr>
                                    <td>핸드폰 번호</td>
                                    <td>:</td>
                                    <td>{userPhoneNum}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='b'>
                    <div className='payHeader2'>
                        결제확인
                    </div>
                    <div className='payCheck'>
                        <table>
                            <tr>
                                <td>상품금액</td>
                                <td>:</td>
                                <td>{addCommasToNumber(totalAmount)}원</td>
                            </tr>
                            <tr>
                                <td>할인 금액</td>
                                <td>:</td>
                                <td>0원</td>
                            </tr>
                            <tr>
                                <td>총 결제 금액</td>
                                <td>:</td>
                                <td>{addCommasToNumber(totalAmount)}원</td>
                            </tr>
                        </table>
                        <div>
                            <label className='payCheck-label1'>
                                <input type="checkbox" checked={isChecked1} onChange={handleCheckboxChange1} />
                                <span className="payCheck-checkbox1"></span>
                                결제 진행 필수 동의
                            </label>
                        </div>
                        <div>
                            <label className='payCheck-label2'>
                                <input type="checkbox" checked={isChecked2} onChange={() => setChecked2(!isChecked2)} />
                                <span className="payCheck-checkbox2"></span>
                                구매조건, 결제 진행 및 결제 대행 서비스 동의(필수)
                            </label>
                        </div>
                        <div>
                            <label className='payCheck-label3'>
                                <input type="checkbox" checked={isChecked3} onChange={() => setChecked3(!isChecked3)} />
                                <span className="payCheck-checkbox3"></span>
                                개인정보 제3자 제공 동의(필수)
                            </label>
                        </div>
                        <div>
                            <button onClick={handlePayment}>
                                {addCommasToNumber(totalAmount)}원 결제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProjectPay;
