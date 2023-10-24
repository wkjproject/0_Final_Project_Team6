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
	const userAddr = useSelector((state)=>state.userAddr.userAddr);
	const userNameRef = useRef();
  const userPasswordRef = useRef();
  const userPasswordCheckRef = useRef();
  const userPhoneNumRef = useRef();
  const navigate = useNavigate();
  // 데이터 불러올때까지 mount 값 false
  const [mount, setMount] = useState(false);
	// 리덕스의 userId 가져오기
  const user_id = useSelector((state) => state.auth.auth.userId)
	// 가져온 정보 useState로 넣어두기
	const [userData, setUserdata] = useState();

	// useEffect로 처음에 화면 넘어갔을때 이메일, 이름, 연락처, 주소 가져오기
	useEffect(() => {
	const endpoint = Endpoint();
	const userProfileModifyData = async () => {
		try {
			await axios.post(`${endpoint}/userProfileModify`, {
				user_id
			}).then((res) => {
				if(res.data.userProfileModifySuccess){
					setUserdata(res.data.userData);
					setMount(true);
				}
			})
		} catch (err) {
			console.log(err);
		}
	}
    userProfileModifyData();
  }, []);

	// 회원가입 수정 버튼을 누르면 데이터 서버로 넘김
	const submit = async (evt) => {
		evt.preventDefault();
		const userName = userNameRef.current.value;
		const userPassword = userPasswordRef.current.value;
		const userPasswordCheck = userPasswordCheckRef.current.value;
		const userPhoneNum = userPhoneNumRef.current.value;
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
				await axios
					.post(`${endpoint}/signup`, {
						userName,
						userPassword,
						userPhoneNum,
						userAddr,
					})
					.then((res) => {
						if(res.data.signupSuccess){
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
	};
	return (
		<div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'30px'}}>
			  <h2>회원정보 수정</h2>
				{mount ? (				<div>
					<br/>
					<br/>
					<MemberShipInput type='text' placeholder={userData.userMail} readOnly></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='text' ref={userNameRef} placeholder= {userData.userName}></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='password' ref={userPasswordRef} placeholder='새로운 비밀번호' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='password' ref={userPasswordCheckRef} placeholder='새로운 비밀번호 확인' ></MemberShipInput>
					<br/>
					<br/>
					<MemberShipInput type='tel' ref={userPhoneNumRef} placeholder= {userData.userPhoneNum} ></MemberShipInput>
					<br/>
					<br/>
					<AddressSearch />
					<br/>
					<br/>
					<MemberShipButton onClick={submit}>회원정보 수정</MemberShipButton>
				</div>) : ('')}
		</div>
	)
}
