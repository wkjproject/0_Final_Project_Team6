import React, { useState, useRef } from "react";
import './ProjectPayCard.css'
import { toast } from 'react-toastify';

const ProjectPayCard = ({ onPaymentStatus1, onPaymentStatus2, onPaymentStatus3 }) => {
    const [selectedOption, setSelectedOption] = useState('option1');
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const mmYyInputRef = useRef(null);
    const pWInputRef = useRef(null);
    const birThInputRef = useRef(null);
    const customId1 = 'msg-id-opening1';
    const customId2 = 'msg-id-opening2';
    const customId3 = 'msg-id-opening3';
    const customStyle = {
        whiteSpace: 'pre-line'
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCancel = () => {
        // 입력된 데이터 초기화
        inputRefs.forEach(ref => {
            if (ref.current) {
                ref.current.value = "";
            }
        });

        // MM/YY 입력란 초기화
        if (mmYyInputRef.current) {
            mmYyInputRef.current.value = "";
        }
        if (pWInputRef.current) {
            pWInputRef.current.value = "";
        }
        if (birThInputRef.current) {
            birThInputRef.current.value = "";
        }
    };

    const Option1Content = () => {

        const handleInputChange = (event, index, maxLength) => {
            let { value } = event.target;

            // 숫자만 입력되도록 정규식을 사용하여 필터링
            value = value.replace(/[^0-9]/g, '');

            // 최대 길이만큼 입력 가능
            if (value.length > maxLength) {
                value = value.slice(0, maxLength);
            }

            // 입력값 업데이트
            event.target.value = value;

            // 다음 input으로 자동 이동
            // if (value.length === maxLength && index < 3) {
            //     inputRefs[index + 1].current.focus();
            // }
        };

        const handleSave1 = () => {
            // 모든 input 값 가져오기
            const cardNumber = inputRefs.map(ref => ref.current.value).join('');
            const mmYy = mmYyInputRef.current.value;
            const pW = pWInputRef.current.value;
            const birTh = birThInputRef.current.value;

            // 모든 필드가 최대치로 채워져 있는지 확인
            if (cardNumber.length === 16 && mmYy.length === 4 && pW.length === 2 && birTh.length === 6) {
                onPaymentStatus1(111); // 모든 칸이 채워져 있을 때 완료 상태를 나타내는 값 전달
                onPaymentStatus2(1);
                onPaymentStatus3(2);
                //alert("결제 정보가 저장되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.")
                toast('결제 정보가 저장되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.', {
                    toastId: customId1,
                    style: customStyle
                })
            } else {
                //alert("모든 결제 정보를 입력해주세요.");
                toast('모든 결제 정보를 입력해주세요.', {
                    toastId: customId1,
                    style: customStyle
                })
            }
        };

        return (
            <div>
                <div className="creditCardInputHeader1">신용(체크)카드번호</div>
                {inputRefs.map((ref, index) => (
                    <input
                        key={index}
                        type="text"
                        ref={ref}
                        onChange={(e) => handleInputChange(e, index, 4)} // 4자리까지 입력 가능
                        maxLength={4}
                        className="creditCardInput1"
                    />
                ))}
                <div>
                    <div className="creditCardInputHeader2">
                        <div>유효기간</div>
                        <div className="creditCardInputHeader2-1">카드 비밀번호</div>
                    </div>
                    <div>
                        <form>
                            <input
                                type="text"
                                ref={mmYyInputRef} // MM/YY 입력란에 참조 추가
                                className="creditCardInput2"
                                placeholder="MM/YY"
                                onChange={(e) => handleInputChange(e, 0, 4)} // 4자리까지 입력 가능
                                maxLength={4}
                            />

                            <input
                                type="password"
                                ref={pWInputRef}
                                className="creditCardInput2"
                                placeholder="앞 2자리"
                                onChange={(e) => handleInputChange(e, 1, 2)} // 2자리까지 입력 가능
                                maxLength={2}
                                autocomplete="new-password"
                            />
                        </form>
                    </div>
                </div>
                <div>
                    <div className="creditCardInputHeader3">생년월일 (주민번호 앞 자리)</div>
                    <input
                        type="text"
                        ref={birThInputRef}
                        className="creditCardInput3"
                        onChange={(e) => handleInputChange(e, 2, 6)} // 6자리까지 입력 가능
                        maxLength={6}
                    />
                </div>
                <div className="creditCardBtnDiv">
                    <button className="creditCardBtn" onClick={handleCancel}>취소</button>
                    <button className="creditCardBtn" onClick={handleSave1}>저장</button>
                </div>
            </div>
        );
    };

    const Option2Content = () => {
        const [selectedOption, setSelectedOption] = useState('카카오뱅크'); // 초기 선택 항목

        const handleSelectChange = (event) => {
            setSelectedOption(event.target.value);
        };

        const handleSave2 = () => {
            onPaymentStatus2(222);
            onPaymentStatus1(0);
            onPaymentStatus3(2);
            //alert("무통장입금 은행 선택이 완료되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.")
            toast('무통장입금 은행 선택이 완료되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.', {
                toastId: customId2,
                style: customStyle
            })
        }

        return (
            <div className="payBankDiv">
                <div>입금할 은행을 선택해주세요.</div>
                <select value={selectedOption} onChange={handleSelectChange} className="payBankSelect">
                    <option value="카카오뱅크">카카오뱅크</option>
                    <option value="토스뱅크">토스뱅크</option>
                    <option value="농협은행">농협은행</option>
                    <option value="국민은행">국민은행</option>
                    <option value="신한은행">신한은행</option>
                    <option value="우리은행">우리은행</option>
                    <option value="기업은행">기업은행</option>
                    <option value="하나은행">하나은행</option>
                    <option value="새마을금고">새마을금고</option>
                    <option value="우체국">우체국</option>
                </select>
                <p>선택한 은행: {selectedOption}</p>
                <button className="payBankSaveBtn" onClick={handleSave2}>저장</button>
            </div>
        );
    };

    const Option3Content = () => {
        const [selectedOption, setSelectedOption] = useState('카카오페이'); // 초기 선택 항목

        const handleSelectChange = (event) => {
            setSelectedOption(event.target.value);
        };

        const handleSave3 = () => {
            onPaymentStatus3(333);
            onPaymentStatus1(0);
            onPaymentStatus2(1);
            //alert("간편결제 페이 선택이 완료되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.")
            toast('간편결제 페이 선택이 완료되었습니다! \n오른쪽에 결제 약관을 동의하고 결제버튼을 눌러주세요.', {
                toastId: customId3,
                style: customStyle
            })
        }

        return (
            <div className="payBankDiv">
                <div>결제할 페이 방식을 선택해주세요.</div>
                <select value={selectedOption} onChange={handleSelectChange} className="payBankSelect">
                    <option value="카카오페이">카카오페이</option>
                    <option value="네이버페이">네이버페이</option>
                    <option value="Samsung Pay">Samsung Pay</option>
                    <option value="KB Pay">KB Pay</option>
                    <option value="애플페이">애플페이</option>
                </select>
                <p>선택한 페이: {selectedOption}</p>
                <button className="payBankSaveBtn" onClick={handleSave3}>저장</button>
            </div>
        );
    };

    let content = null;
    if (selectedOption === 'option1') {
        content = <Option1Content />;
    } else if (selectedOption === 'option2') {
        content = <Option2Content />;
    } else if (selectedOption === 'option3') {
        content = <Option3Content />;
    }

    return (
        <div className="ProjectPayCardMain">
            <div>
                <label className="ProjectPayCardMainRadio">
                    <input
                        type="radio"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleOptionChange}
                    />
                    카드 결제
                </label>
                <label className="ProjectPayCardMainRadio">
                    <input
                        type="radio"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={handleOptionChange}
                    />
                    무통장 입금
                </label>
                <label className="ProjectPayCardMainRadio">
                    <input
                        type="radio"
                        value="option3"
                        checked={selectedOption === 'option3'}
                        onChange={handleOptionChange}
                    />
                    간편결제
                </label>
            </div>
            <div>
                {content}
            </div>
        </div>
    );
};

export default ProjectPayCard;
