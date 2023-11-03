import React, {useRef} from 'react'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import {MemberShipContainer, MemberShipDivCenter, MemberShipInput, MemberShipInputShort, MemberShipButton, MemberShipButtonShort} from '../../../css/MemberService/MemberShipCss'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../../redux/reducer/userNameActions';
import Endpoint from '../../../config/Endpoint';
import AddressSearch from '../MemberService/Address/AddressSearch';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserProfileModify() {
	const endpoint = Endpoint();
	const userNameRef = useRef();
	// 비밀번호만 차후 초기화시키려고 useState로 설정 
	const [userPassword, setUserPassword] = useState('');
	const [userPasswordCheck, setUserPasswordCheck] = useState('');
  const userPhoneNumRef = useRef();
	// 리덕스 정보 가져오기
	const userId = useSelector((state) => state.userData.userData.userId)
	const userMail = useSelector((state) => state.userData.userData.userMail)
	const userName = useSelector((state) => state.userData.userData.userName)
	const userPhoneNum = useSelector((state) => state.userData.userData.userPhoneNum)
	const authUserAddr = useSelector((state) => state.userData.userData.userAddr)
	const userAddr = useSelector((state) => state.userAddr.userAddr)

	// 회원가입 수정 버튼을 누르면 데이터 서버로 넘김
	const submit = async (evt) => {
		evt.preventDefault();
		const userNameChanged = userNameRef.current.value === '' ? userName : userNameRef.current.value;
		const userPhoneNumChanged = userPhoneNumRef.current.value === '' ? userPhoneNum : userPhoneNumRef.current.value;
		// AddressSearch 컴포넌트에서 dispatch하는 userAddr과 로그인시 auth로 입력하는 authUserAddr가 일치할경우 authUserAddr
		const userAddrChanged = (userAddr !== undefined && userAddr === authUserAddr) ? userAddr : authUserAddr;
		if (userPassword !== userPasswordCheck) {
			toast('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
			return;
		}

		const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
		if (!phoneRegex.test(userPhoneNum)) {
			toast('연락처 형식이 올바르지 않습니다.');
			return;
		}
			try {
				if(userPassword.trim() !== '') {
					await axios
					.post(`${endpoint}/userProfileModify`, {
						userId,
						userNameChanged,
						userPassword,
						userPhoneNumChanged,
						userAddrChanged,
					})
					.then((res) => {
						if(res.data.userProfileModifySuccess){
							toast('회원정보 수정 성공')
							window.location.reload();
						}
						if(!res.data.userProfileModifySuccess){
							toast('회원정보 수정 실패')
						}
					})
				}
				if(userPassword.trim() === '') {
					await axios
					.post(`${endpoint}/userProfileModify`, {
						userId,
						userNameChanged,
						userPhoneNumChanged,
						userAddrChanged,
					})
					.then((res) => {
						if(res.data.userProfileModifySuccess){
							toast('회원정보 수정 성공')
							window.location.reload();
						}
						if(!res.data.userProfileModifySuccess){
							toast('회원정보 수정 실패')
						}
					})
				}
				} catch(err){
					console.log(err)}
	};
	return (
		<div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'30px'}}>
			  <h2>회원정보 수정</h2>
				<div>
					<br/>
					<br/>
					<MemberShipInput type='text' placeholder={userMail} readOnly></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='text' ref={userNameRef} placeholder= {userName}></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput
						type='password'
						placeholder='새로운 비밀번호'
						value={userPassword}
						onChange={(e) => setUserPassword(e.target.value)}
					/>
					<br/>
					<br/>
					<MemberShipInput
						type='password'
						placeholder='새로운 비밀번호 확인'
						value={userPasswordCheck}
						onChange={(e) => setUserPasswordCheck(e.target.value)}
					/>
					<br/>
					<br/>
					<MemberShipInput type='tel' ref={userPhoneNumRef} placeholder= {userPhoneNum} ></MemberShipInput>
					<br/>
					<br/>
					<AddressSearch userProfileUserAddr={authUserAddr}/>
					<br/>
					<br/>
					<MemberShipButton style={{marginBottom:'100px'}} onClick={submit}>회원정보 수정</MemberShipButton>			
				</div>
		</div>
	)
}
