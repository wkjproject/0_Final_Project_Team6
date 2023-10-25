import React, {useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Kakao } from './SocialLogin/Kakao';
import {MemberShipContainer, MemberShipDivCenter, MemberShipInput, MemberShipInputShort, MemberShipButton, MemberShipButtonShort} from '../../../css/MemberService/MemberShipCss'
import AddressSearch from './Address/AddressSearch'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../../redux/reducer/userNameActions';
import { Terms } from './termsModal/Terms';
import Endpoint from '../../../config/Endpoint';

export default function Signup() {
	const endpoint = Endpoint();
	const [userMailCheckState, setUserMailCheckState] = useState(false);
	const [checkboxCheck, setCheckboxCheck] = useState(false);
	const dispatch = useDispatch();
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const userAddr = useSelector((state)=>state.userAddr.userAddr);
	const userMailRef = useRef();
	const userNameRef = useRef();
  const userPasswordRef = useRef();
  const userPasswordCheckRef = useRef();
  const userPhoneNumRef = useRef();
  const navigate = useNavigate();
  // 중복확인 버튼 누르면 이메일 중복 확인
	const userMailCheck = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		if (userMail !== '' && userMail !== null && emailRegex.test(userMail)) {
			try {
						await axios
						.post(`${endpoint}/signup/userMailCheck`,{
							userMail,
						})
						.then((res) => {
							if(res.data.userMailCheck){
								alert('사용 가능한 이메일입니다.')
								setUserMailCheckState(true)
							}
							if(!res.data.userMailCheck){
								alert('사용 불가능한 이메일입니다.')
							}
						})
					}
					catch (e) {
						console.log(e)
					}
		} else {
			alert('이메일 형식이 올바르지 않습니다.')
		}
		
	}

	// 회원가입 버튼 누르면 데이터 서버로 넘김
	const submit = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		const userName = userNameRef.current.value;
		const userPassword = userPasswordRef.current.value;
		const userPasswordCheck = userPasswordCheckRef.current.value;
		const userPhoneNum = userPhoneNumRef.current.value;
		if (userPassword !== userPasswordCheck) {
			alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
			return;
		}

		const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
		if (!emailRegex.test(userMail)) {
			alert('이메일 형식이 올바르지 않습니다.');
			return;
		}
		if (!phoneRegex.test(userPhoneNum)) {
			alert('연락처 형식이 올바르지 않습니다.');
			return;
		}
		if (!checkboxCheck){
			alert('약관에 동의해야 합니다.')
			return;
		}
		if (userMailCheckState){
			try {
				await axios
					.post(`${endpoint}/signup`, {
						userMail,
						userName,
						userPassword,
						userPhoneNum,
						userAddr,
					})
					.then((res) => {
						if(res.data.signupSuccess){
							setUserMailCheckState(false);
							dispatch(setUserName(res.data.userName)); // 리덕스로 userName 보냄
							alert('회원가입 성공!')
							navigate('/login');
						}
					})
					.catch((e) => {
						alert(e);
					});
			} catch (e) {
				alert(e);
			}
		}
		if(!userMailCheckState){
			alert('이메일 중복확인을 해주세요.')
		}
	};
	return (
		<MemberShipContainer>
			  <h2>회원가입</h2>
				<div>
					<br/>
					<Kakao />
					<img style={{width: '40px', height: '40px', position:'relative', top:'-39px', left:'85px'}} src='/img/kakaoLogo.png' alt="Kakao Login" />
					<br/>
					<br/>
					<br/>
					<MemberShipInputShort type='text' ref={userMailRef} placeholder='이메일 입력' ></MemberShipInputShort>
					<MemberShipButtonShort onClick={userMailCheck}>중복확인</MemberShipButtonShort>
					<br/>
					<br/>
					<MemberShipInput type='text' ref={userNameRef} placeholder='이름' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='password' ref={userPasswordRef} placeholder='비밀번호' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='password' ref={userPasswordCheckRef} placeholder='비밀번호 확인' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='tel' ref={userPhoneNumRef} placeholder='연락처 (010-0000-0000)' ></MemberShipInput>
					<br/>
					<br/>
					<AddressSearch />
					<br/>
					<br/>
					<label for="myCheckbox">약관 동의</label>
					<input type="checkbox" id="myCheckbox" checked={checkboxCheck} onChange={(e) => setCheckboxCheck(e.target.checked)}/>
					<Terms />
					<MemberShipButton onClick={submit}>가입하기</MemberShipButton>
				</div>
    </MemberShipContainer>
	)
}
