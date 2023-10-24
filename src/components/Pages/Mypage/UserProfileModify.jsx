import React, {useEffect, useRef, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {MemberShipContainer, MemberShipDivCenter, MemberShipInput, MemberShipInputShort, MemberShipButton, MemberShipButtonShort} from '../../../css/MemberService/MemberShipCss'
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../../../redux/reducer/userNameActions';
import Endpoint from '../../../config/Endpoint';
import AddressSearch from '../MemberService/Address/AddressSearch';

export default function UserProfileModify() {
	const endpoint = Endpoint();
	const dispatch = useDispatch();
	const userNameRef = useRef();
  const userPasswordRef = useRef();
  const userPasswordCheckRef = useRef();
  const userPhoneNumRef = useRef();
	const userAddrRef = useRef();
  const navigate = useNavigate();
	// 리덕스 정보 가져오기
	const userId = useSelector((state) => state.auth.auth.userId)
	const userMail = useSelector((state) => state.auth.auth.userMail)
	const userName = useSelector((state) => state.auth.auth.userName)
	const userPhoneNum = useSelector((state) => state.auth.auth.userPhoneNum)
	const userAddr = useSelector((state) => state.auth.auth.userAddr)



	// 회원가입 수정 버튼을 누르면 데이터 서버로 넘김
	const submit = async (evt) => {
		evt.preventDefault();
		const userNameChanged = userNameRef.current.value === '' ? userName : userNameRef.current.value;
		const userPassword = userPasswordRef.current.value;
		const userPasswordCheck = userPasswordCheckRef.current.value;
		const userPhoneNumChanged = userPhoneNumRef.current.value === '' ? userPhoneNum : userPhoneNumRef.current.value;
		const userAddrChanged = userAddrRef.current.value === '' ? userAddr : userAddrRef.current.value;
		if (userPassword !== userPasswordCheck) {
			alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
			return;
		}

		const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
		if (!phoneRegex.test(userPhoneNum)) {
			alert('연락처 형식이 올바르지 않습니다.');
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
					<MemberShipInput type='password' ref={userPasswordRef} placeholder='새로운 비밀번호' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='password' ref={userPasswordCheckRef} placeholder='새로운 비밀번호 확인' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='tel' ref={userPhoneNumRef} placeholder= {userPhoneNum} ></MemberShipInput>
					<br/>
					<br/>
					<AddressSearch />
					<br/>
					<br/>
					<MemberShipButton onClick={submit}>회원정보 수정</MemberShipButton>
				</div>
		</div>
	)
}
