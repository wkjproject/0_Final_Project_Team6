import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../../../css/MemberService/IdpwFind.css'
import Endpoint from '../../../config/Endpoint';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IdpwFind() {
	const endpoint = Endpoint();
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState('');
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
			await axios.post(`${endpoint}/signup/userMailCheck`, {
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
		setIsButtonDisabled(true);
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
		const userMail = userMailRef.current.value;
		await axios.post(`${endpoint}/pwCodeMailSend`, {
		userMail
		}).then((res) => {
			if(res.data.sendMailSuccess){
				
				toast('인증번호 발송 성공')
				// 1초마다 countdown 값을 감소
			}
			if(!res.data.sendMailSuccess){
				toast(res.data.message);
			}
		})
	}

	// 비밀번호 찾기에서 인증번호 확인 부분
	const verifiConfirm = async (evt) => {
		evt.preventDefault();
		const userMail = userMailRef.current.value;
		const verifiCode = verifiCodeRef.current.value;
		if(verifiCode.length !== 6){
			toast('인증번호를 확인해주세요.')
		}
		await axios.post(`${endpoint}/verifiCode`, {
			userMail,
			verifiCode
		}).then((res) => {
			if(res.data.verificationSuccess){
				setVerifiConfirmState(true);
				setUserMailSave(userMail);
				toast(res.data.message);
			}
			if(!res.data.verificationSuccess){
				toast(res.data.message);
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
			toast('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
			return;
		}
		await axios.post(`${endpoint}/newPassword`, {
			userMail,
			userPassword
		}).then((res) => {
			if(res.data.newPasswordSuccess){
				toast(res.data.message)
				navigate('/IdpwFind')
				window.location.reload();
			}
			if(!res.data.newPasswordSuccess){
				toast(res.data.message)
			}
		})
	}
	// 아이디찾기 성공 후 로그인 버튼을 누르면 로그인으로 가도록
	const moveLogin = () => {
		navigate('/login');
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
 const [currTab, setCurrTab] = useState('idFind');
 const handleTabClick = (tabName) => {
    setCurrTab(tabName);
    /* setCurrPage(1); // 탭 변경시, 1페이지로 초기화 */
  };
	return (
		<div className='IdpwFindContainer'>
			<div className='tabs' style={{position:'absolute', top:'400px'}}>
        <ul>
          <li
            className={`tab ${currTab === 'idFind' ? 'active' : ''}`}
            onClick={() => handleTabClick('idFind')}
          >
            아이디 찾기
          </li>
          <li
            className={`tab ${currTab === 'pwFind' ? 'active' : ''}`}
            onClick={() => handleTabClick('pwFind')}
          >
            비밀번호 찾기
          </li>
        </ul>
      </div>
			{currTab === 'idFind' ? (
				IdFind ? (
				<>
				<p style={{fontSize:'var(--TextLarge'}}>{getUserMail}</p>
				<br/>
				<p style={{fontSize:'var(--TextMedium', marginBottom:'30px'}}>회원으로 등록된 이메일 아이디입니다.</p>
				<button className='IdpwFindButton' onClick={moveLogin} >로그인</button>
				</>) : (				
				<div style={{textAlign:'center', width:'400px', marginTop:'-49px'}}>
				<p>가입하실 때 사용하신 이메일을 입력해주세요.</p>
				<br/>
				<input className='IdpwFindInputInDiv' type='text' ref={userMailRef} placeholder='이메일 입력' style={{marginBottom:'30px'}}></input>
				<button className='IdpwFindButtonInDiv' onClick={userMailFind}>로그인 아이디 확인</button>
				</div>)

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
				<br/>
				<div style={{textAlign:'center', width:'400px'}}>
				<div style={{display:'flex', justifyContent:'center', marginBottom:'-25px'}}>
				<input className='IdpwFindInputShort' type='text' ref={userMailRef} placeholder='이메일 입력' ></input>
				<button className='IdpwFindButtonShort' onClick={verifiCodeMailSend} disabled={isButtonDisabled}>{isButtonDisabled ? `${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}` : '인증번호 받기'}</button>
				</div>
				<br/>
				<br/>
				<input className='IdpwFindInputInDiv' type='text' ref={verifiCodeRef} placeholder='인증번호 입력' style={{marginBottom:'30px'}} maxLength={6}></input>
				<button className='IdpwFindButtonInDiv' onClick={verifiConfirm}>비밀번호 재설정</button>
				</div>
				</>)
			)}
		</div>
	)
}
