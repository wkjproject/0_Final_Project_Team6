import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';


export default function IdpwFind() {
	const [IdpwFindState, setIdpwFindState] = useState(true);
	const [IdFind, setIdFind] = useState(false);
	const [getUserMail, setGetUserMail] = useState();
	const userMailRef = useRef();
	const VerifiCode = useRef();
	const moveIdFind = (evt) => {
		evt.preventDefault();
		setIdpwFindState(true)
	}
	const movePwFind = (evt) => {
		evt.preventDefault();
		setIdpwFindState(false);
	}
	const userMailFind = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		try {
			axios.post('http://localhost:5000/signup/userMailCheck', {
				userMail,
			}).then((res) => {
				if(!res.data.userMailCheck){ // 사용자가 존재하면 서버에서 false로 답변
					setIdFind(true);
					setGetUserMail(userMailRef.current.value);
				}
				if(res.data.userMailCheck){ 
					setGetUserMail('등록되지 않은 이메일입니다.')
				}
			})
		} catch(err) {
			console.log('IdpwFind userMailFind', err);
		}
	}
	const VerifiCodeMailSend = (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		axios.post('http://localhost:5000/pwCodeMailSend', {
		userMail
		}).then((res) => {
			if(res.data.sendMailSuccess){
				alert('인증번호 발송 성공')
			}
		})
	}
	const VerifiConfirm = () => {

	}
	const userPasswordReset = () => {

	}

	useEffect(() => {
  const handleBeforeUnload = (evt) => {
    evt.preventDefault();
    setIdFind(false);
  }

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }
}, []);
	return (
		<div>
			<button onClick={moveIdFind}>
        아이디 찾기
      </button>
			<br/>
			<button onClick={movePwFind}>
        비밀번호 찾기
      </button>
			<br/>
			<br/>
			{IdpwFindState ? (
				IdFind ? (
				<>
				<p>{getUserMail}</p>
				<p>회원으로 등록된 이메일 아이디입니다.</p>
				<NavLink to="/Login"><button>로그인</button></NavLink>
				</>) : (				<>
				<p>가입하실 때 사용하신 이메일을 입력해주세요.</p>
				<input type='text' ref={userMailRef} placeholder='이메일 입력' ></input>
				<br/>
				<button className='IdpwFindButton' onClick={userMailFind}>로그인 아이디 확인</button>
				</>)

			) : (
				<>
				<p>가입하실 때 사용하신 이메일을 입력해주세요.</p>
				<input className='IdpwFindInputShort' type='text' ref={userMailRef} placeholder='이메일 입력' ></input>
				<button className='IdpwFindButtonShort' onClick={VerifiCodeMailSend}>인증번호 받기</button>
				<br/>
				<input className='IdpwFindInputShort' type='text' ref={VerifiCode} placeholder='인증번호 입력' ></input>
				<button className='IdpwFindButtonShort' onClick={VerifiConfirm}>인증 확인</button>
				<br/>
				<button className='IdpwFindButton' onClick={userPasswordReset}>비밀번호 재설정</button>
				</>
			)}
		</div>
	)
}
