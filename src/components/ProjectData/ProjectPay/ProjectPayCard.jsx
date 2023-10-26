import React, { useState, useRef } from "react";
import './ProjectPayCard.css'

const ProjectPayCard = ({ onPaymentStatus }) => {
    const [selectedOption, setSelectedOption] = useState('option1');
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const mmYyInputRef = useRef(null);
    const pWInputRef = useRef(null);
    const birThInputRef = useRef(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCancel = () => {
        // 입력된 데이터 초기화

        if (inputRefs.ref.current) {
            inputRefs.ref.current.value = "";
        }

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

        const handleSave = () => {
            // 모든 input 값 가져오기
            const cardNumber = inputRefs.map(ref => ref.current.value).join('');
            const mmYy = mmYyInputRef.current.value;
            const pW = pWInputRef.current.value;
            const birTh = birThInputRef.current.value;

            // 모든 필드가 최대치로 채워져 있는지 확인
            if (cardNumber.length === 16 && mmYy.length === 4 && pW.length === 2 && birTh.length === 6) {
                onPaymentStatus(777); // 모든 칸이 채워져 있을 때 완료 상태를 나타내는 값 전달
            } else {
                alert("모든 결제 정보를 입력해주세요.");
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
                        />
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
                    <button className="creditCardBtn" onClick={handleSave}>저장</button>
                </div>
            </div>
        );
    };

    const Option2Content = () => {
        return <div>무통장 입금</div>;
    };

    const Option3Content = () => {
        return <div>간편결제</div>;
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
