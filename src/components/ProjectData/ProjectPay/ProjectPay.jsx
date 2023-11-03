import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProjectPay.css';
import { useSelector } from 'react-redux';
import Modal1 from '../AgreeModal/Modal1'
import Modal2 from '../AgreeModal/Modal2'
import Modal3 from '../AgreeModal/Modal3'
import ProjectPayCard from './ProjectPayCard';
import { useEffect } from 'react';
import axios from 'axios';
import Endpoint from '../../../config/Endpoint';
import { toast } from 'react-toastify';

const ProjectPay = () => {
    const endpoint = Endpoint();
    const location = useLocation();
    const location2 = useLocation();
    const selectedRewards = location.state.data;
    const projectInfo = location2.state.data2;
    const rewardsArray = selectedRewards;
    //console.log(location);
    const customId1 = 'msg-id-opening1';
    const customId2 = 'msg-id-opening2';

    const navigate = useNavigate();

    // 숫자를 세 자리마다 쉼표(,)를 추가하는 함수
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //ProjectPayCard에서 모든 결제 정보가 입력되면 ProjectPay로 "111" 발송
    const [paymentStatus1, setPaymentStatus1] = useState(0);
    //console.log(paymentStatus1);

    const handlePaymentStatus1 = (status) => {
        setPaymentStatus1(status);
    };

    const [paymentStatus2, setPaymentStatus2] = useState(1);
    //console.log(paymentStatus2);

    const handlePaymentStatus2 = (status) => {
        setPaymentStatus2(status);
    };

    const [paymentStatus3, setPaymentStatus3] = useState(2);
    //console.log(paymentStatus3);

    const handlePaymentStatus3 = (status) => {
        setPaymentStatus3(status);
    };

    const userName = useSelector((state) => state.userName.userName); // 로그인한 userName
    const userMail = useSelector((state) => state.userMail.userMail); // 로그인한 userMail
    const userAddr = useSelector((state) => state.userAddr.userAddr); // 로그인한 userAddr
    const userPhoneNum = useSelector((state) => state.userPhoneNum.userPhoneNum); // 로그인한 userPhoneNum
    const userId = useSelector((state) => state.userData.userData.userId);
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

    useEffect(() => {
        if (isChecked2 && isChecked3) {
            setChecked1(true);
        }
    }, [isChecked2, isChecked3])

    const handlePayment = async () => {
        const currentTime = new Date();
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
        else if (isChecked2 && isChecked3 && paymentStatus1 === 111) {
            // 결제하기 버튼 누르면 fundings 컬렉션에 user_id, project_id, rewards, fundingDate(현재날짜) 보내기
            await axios.post(`${endpoint}/pay`, {
                user_id: userId,
                project_id: projectInfo._id,
                rewardsList: selectedRewards,
                fundingDate: currentTime,
                projFund: totalAmount,
            })
            //alert("결제완료");
            toast('결제완료', {
                toastId: customId1,
            })
            navigate('/home');
        }
        else if (isChecked2 && isChecked3 && paymentStatus2 === 222) {
            // 결제하기 버튼 누르면 fundings 컬렉션에 user_id, project_id, rewards, fundingDate(현재날짜) 보내기
            await axios.post(`${endpoint}/pay`, {
                user_id: userId,
                project_id: projectInfo._id,
                rewardsList: selectedRewards,
                fundingDate: currentTime,
                projFund: totalAmount,
            })
            //alert("결제완료");
            toast('결제완료', {
                toastId: customId1,
            })
            navigate('/home');
        }
        else if (isChecked2 && isChecked3 && paymentStatus3 === 333) {
            // 결제하기 버튼 누르면 fundings 컬렉션에 user_id, project_id, rewards, fundingDate(현재날짜), projFund(결제금액) 보내기
            await axios.post(`${endpoint}/pay`, {
                user_id: userId,
                project_id: projectInfo._id,
                rewardsList: selectedRewards,
                fundingDate: currentTime,
                projFund: totalAmount,
            })
            //alert("결제완료");
            toast('결제완료', {
                toastId: customId1,
            })
            navigate('/home');
        }
        else {
            //alert("결제 정보를 입력해주세요.");
            toast('결제 정보를 입력해주세요.', {
                toastId: customId2,
            })
        }
    };

    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalOpen3, setModalOpen3] = useState(false);

    // 모달창 노출
    const showModal1 = () => {
        setModalOpen1(true);
        // 스크롤 비활성화
        document.body.classList.add('modal-open');
    };
    // 모달창 노출
    const showModal2 = () => {
        setModalOpen2(true);
        // 스크롤 비활성화
        document.body.classList.add('modal-open');
    };
    // 모달창 노출
    const showModal3 = () => {
        setModalOpen3(true);
        // 스크롤 비활성화
        document.body.classList.add('modal-open');
    };

    // 모달창 닫기
    const closeModal = () => {
        setModalOpen1(false);
        setModalOpen2(false);
        setModalOpen3(false);
        // 스크롤 활성화
        document.body.classList.remove('modal-open');
    };

    return (
        <div className='payDiv'>
            <br />
            <div className='payList'>
                <div className='payInfoDiv'>
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
                            {rewardsArray.map((reward, index2) => (
                                <li key={index2} className='payLi'>
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
                                            <td>{reward.projRewardAvailable}</td>
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
                    <div className='payType'>
                        <div className='payTypeHeader'>결제 수단</div>
                        <hr className='payHr' />
                        <br />
                        <ProjectPayCard onPaymentStatus1={handlePaymentStatus1} onPaymentStatus2={handlePaymentStatus2} onPaymentStatus3={handlePaymentStatus3}></ProjectPayCard>
                    </div>
                </div>
                <div className='payCheckDiv'>
                    <div className='payHeader2'>
                        결제확인
                    </div>
                    <div className='payCheck'>
                        <div className='payCheckArea'>
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
                                <div className='payAgree1'>
                                    <label className='payCheck-label1'>
                                        <input type="checkbox" checked={isChecked1} onChange={handleCheckboxChange1} />
                                        <div className="payCheck-checkbox1"></div>
                                        <div className='agreeText1'>
                                            결제 진행 필수 동의
                                        </div>
                                    </label>
                                </div>
                                <div className='payAgree2'>
                                    <label className='payCheck-label2'>
                                        <input type="checkbox" checked={isChecked2} onChange={() => setChecked2(!isChecked2)} />
                                        <div className="payCheck-checkbox2"></div>
                                        <div className='agreeText2'>
                                            구매조건, 결제 진행 및 결제 대행 서비스 동의(필수)
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <ul className='payAgreeList'>
                                        <li>
                                            <td className='payAgreeTd1'>
                                                전자금융거래 이용약관
                                            </td>
                                            <td>
                                                <button className='agreeBtn1' onClick={showModal1}>
                                                    &#5171;
                                                </button>
                                            </td>
                                        </li>

                                        <li>
                                            <td className='payAgreeTd2'>
                                                개인정보 제3자 제공 동의
                                            </td>
                                            <td>
                                                <button className='agreeBtn2' onClick={showModal2}>
                                                    &#5171;
                                                </button>
                                            </td>
                                        </li>
                                    </ul>
                                </div>
                                <div className='payAgree3'>
                                    <label className='payCheck-label3'>
                                        <input type="checkbox" checked={isChecked3} onChange={() => setChecked3(!isChecked3)} />
                                        <div className="payCheck-checkbox3"></div>
                                        <div className='agreeText3'>
                                            개인정보 제3자 제공 동의(필수)
                                        </div>
                                        <div>
                                            <button className='agreeBtn3' onClick={showModal3}>
                                                &#5171;
                                            </button>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button onClick={handlePayment} className='payComfirmBtn'>
                                    {addCommasToNumber(totalAmount)}원 결제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen1 && <Modal1 setModalOpen={closeModal} />}
            {modalOpen2 && <Modal2 setModalOpen={closeModal} />}
            {modalOpen3 && <Modal3 setModalOpen={closeModal} />}
        </div >
    );
};

export default ProjectPay;
