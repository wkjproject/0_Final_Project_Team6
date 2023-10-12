import React, {useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Kakao } from './SocialLogin/Kakao';
import '../../../css/MemberService/Signup.css'
import AddressSearch from './Address/AddressSearch'

export default function Signup() {
	const userMailRef = useRef();
	const userNameRef = useRef();
  const userPwdRef = useRef();
  const userPwdCheckRef = useRef();
  const userPhoneRef = useRef();
  const navigate = useNavigate();
  // 중복확인 버튼 누르면 이메일 중복 확인
	const userMailCheck = async (evt) => {
		evt.preventDefault();
	}

	// 회원가입 버튼 누르면 데이터 서버로 넘김
	const submit = async (evt) => {
	evt.preventDefault();
	const userMail = userMailRef.current.value;
	const userName = userNameRef.current.value;
	const userPwd = userPwdRef.current.value;
	const userPwdCheck = userPwdCheckRef.current.value;
	const userPhone = userPhoneRef.current.value;
	if (userPwd !== userPwdCheck) {
		alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
		return;
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
	if (!emailRegex.test(userMail)) {
		alert('이메일 형식이 올바르지 않습니다.');
		return;
	}
	if (!phoneRegex.test(userPhone)) {
		alert('연락처 형식이 올바르지 않습니다.');
		return;
	}
	try {
		await axios
			.post('http://localhost:3000/signup', {
				userMail,
				userName,
				userPwd,
				userPhone,
			})
			.then((res) => {
				if (res.data === 'exist') {
					alert('UserId already exists');
				} else if (res.data === 'not exist') {
					navigate('/home', { state: { id: userName } }); //리덕스로 변경
				}
			})
			.catch((e) => {
				alert('wrong details');
				console.log(e);
			});
	} catch (e) {
		console.log(e);
	}
};
	return (
		<div className='SignupContainer'>
				<Kakao />
				<input className='signupInputShort' type='text' ref={userMailRef} placeholder='이메일 입력'></input>
				<button className='signupButtonShort' onClick={userMailCheck}>중복확인</button>
				<br/>
				<br/>
				<input className='signupInput' type='text' ref={userNameRef} placeholder='이름'></input>
				<br/>
				<br/>
				<input className='signupInput' type='password' ref={userPwdRef} placeholder='비밀번호' ></input>
				<br/>
				<br/>
				<input className='signupInput' type='password' ref={userPwdCheckRef} placeholder='비밀번호 확인'></input>
				<br/>
				<br/>
				<input className='signupInput' type='tel' ref={userPhoneRef} placeholder='연락처'></input>
				<br/>
				<br/>
				<AddressSearch />
				<br/>
				<br/>
        <button type='submit' onClick={submit}>
          <p>회원가입</p>
        </button>
    </div>
	)
}
