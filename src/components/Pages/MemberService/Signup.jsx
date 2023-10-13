import React, {useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Kakao } from './SocialLogin/Kakao';
import '../../../css/MemberService/Signup.css'
import AddressSearch from './Address/AddressSearch'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../../redux/reducer/userNameActions';

export default function Signup() {
	const [userMailCheckState, setUserMailCheckState] = useState(false);
	const dispatch = useDispatch();
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
		try {
			await axios
			.post('http://localhost:5000/signup/userMailCheck',{
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

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
		if (!emailRegex.test(userMail)) {
			alert('이메일 형식이 올바르지 않습니다.');
			return;
		}
		if (!phoneRegex.test(userPhoneNum)) {
			alert('연락처 형식이 올바르지 않습니다.');
			return;
		}
		if (userMailCheckState){
			try {
				await axios
					.post('http://localhost:5000/signup', {
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
		<div className='SignupContainer'>
			  <h2>회원가입</h2>
				<br/>
				<Kakao />
				<br/>
				<br/>
				<br/>
				<div>
					<input className='signupInputShort' type='text' ref={userMailRef} placeholder='이메일 입력' required></input>
					<button className='signupButtonShort' onClick={userMailCheck}>중복확인</button>
					<br/>
					<br/>
					<input className='signupInput' type='text' ref={userNameRef} placeholder='이름' required></input>
					<br/>
					<br/>
					<input className='signupInput' type='password' ref={userPasswordRef} placeholder='비밀번호' required></input>
					<br/>
					<br/>
					<input className='signupInput' type='password' ref={userPasswordCheckRef} placeholder='비밀번호 확인' required></input>
					<br/>
					<br/>
					<input className='signupInput' type='tel' ref={userPhoneNumRef} placeholder='연락처 (010-0000-0000)' required></input>
					<br/>
					<br/>
					<AddressSearch />
					<br/>
					<br/>
					<button className='signupButton' onClick={submit}>회원가입</button>
				</div>
    </div>
	)
}
