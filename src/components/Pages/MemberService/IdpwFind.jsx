import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';


export default function IdpwFind() {
	const navigate = useNavigate();
	// 인증번호 받기 버튼 상태 관리(인증코드 받으면 3분동안 재발송 불가)
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3분(180초)

	// 아이디찾기 & 비밀번호찾기 상태관리, true면 아이디찾기 & false면 비밀번호찾기
	const [IdpwFindState, setIdpwFindState] = useState(true);

	// 아이디찾기 성공 실패 상태관리
	const [IdFind, setIdFind] = useState(false);

	// 비밀번호 찾기 인증번호 일치 불일치 상태관리
	const [verifiConfirmState, setVerifiConfirmState] = useState(false);

	// 아이디찾기 성공 시 아이디 저장
	const [getUserMail, setGetUserMail] = useState();

	// 이메일 상태 저장
	const [userMailSave, setUserMailSave] = useState();
	const userPasswordRef = useRef();
	const userPasswordCheckRef = useRef();
	const userMailRef = useRef();
	const verifiCodeRef = useRef();
	const moveIdFind = (evt) => {
		evt.preventDefault();
		setIdpwFindState(true)
	}
	const movePwFind = (evt) => {
		evt.preventDefault();
		setIdpwFindState(false);
	}

	// 아이디찾기에서 사용자 입력값이랑 서버에 있는 이메일이랑 비교하는 부분
	const userMailFind = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		try {
			await axios.post('http://localhost:5000/signup/userMailCheck', {
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

	// 비밀번호 찾기에서 인증번호 받기 부분
	const verifiCodeMailSend = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		await axios.post('http://localhost:5000/pwCodeMailSend', {
		userMail
		}).then((res) => {
			if(res.data.sendMailSuccess){
				setIsButtonDisabled(true);
				alert('인증번호 발송 성공')
				// 1초마다 countdown 값을 감소
				const interval = setInterval(() => {
					setCountdown((prevCountdown) => {
						if (prevCountdown <= 0) {
							clearInterval(interval); // countdown이 0 이하가 되면 타이머 종료
							setIsButtonDisabled(false); // 버튼 다시 활성화
							return 0;
						}
						return prevCountdown - 1;
					});
				}, 1000); // 1초(1000 밀리초)
			}
		})
	}

	// 비밀번호 찾기에서 인증번호 확인 부분
	const verifiConfirm = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		const verifiCode = verifiCodeRef.current.value;
		await axios.post('http://localhost:5000/verifiCode', {
			userMail,
			verifiCode
		}).then((res) => {
			if(res.data.verificationSuccess){
				setVerifiConfirmState(true);
				setUserMailSave(userMail);
				alert(res.data.message);
			}
		})
	}

	// 비밀번호 찾기에서 새로운 비밀번호 변경 부분
	const changeToNewPassword = async (evt) => {
		evt.preventDefault();
		const userMail = userMailSave;
		const userPassword = userPasswordRef.current.value;
		const userPasswordCheck = userPasswordCheckRef.current.value;
		if (userPassword !== userPasswordCheck) {
			alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
			return;
		}
		await axios.post('http://localhost:5000/newPassword', {
			userMail,
			userPassword
		}).then((res) => {
			if(res.data.newPasswordSuccess){
				alert(res.data.message)
				navigate('/IdpwFind')
				window.location.reload();
			}
			if(!res.data.newPasswordSuccess){
				alert(res.data.message)
			}
		})
	}

	//사용자가 뒤로가기, 새로고침, 브라우저 종료 시 상태값 변경
	useEffect(() => {
  const handleBeforeUnload = (evt) => {
    evt.preventDefault();
    setIdFind(false);
		setIsButtonDisabled(false);
		setVerifiConfirmState(false);
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

			) : ( verifiConfirmState ? 
			(<> 					
					<input className='IdpwFindInput' type='password' ref={userPasswordRef} placeholder='새로운 비밀번호' ></input>
					<br/>
					<input className='IdpwFindInput' type='password' ref={userPasswordCheckRef} placeholder='새로운 비밀번호 확인' ></input>
					<br/>
					<button className='IdpwFindButton' onClick={changeToNewPassword}>비밀번호 변경</button>
			</>) : 
			(<>
				<p>가입하실 때 사용하신 이메일을 입력해주세요.</p>
				<input className='IdpwFindInputShort' type='text' ref={userMailRef} placeholder='이메일 입력' ></input>
				<button className='IdpwFindButtonShort' onClick={verifiCodeMailSend} disabled={isButtonDisabled}>{isButtonDisabled ? `${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}` : '인증번호 받기'}</button>
				<br/>
				<input className='IdpwFindInputShort' type='text' ref={verifiCodeRef} placeholder='인증번호 입력' ></input>
				<br/>
				<button className='IdpwFindButton' onClick={verifiConfirm}>비밀번호 재설정</button>
				</>)
			)}
		</div>
	)
}
