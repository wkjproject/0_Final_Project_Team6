import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../redux/reducer/userNameActions';
import { Kakao } from './Kakao';

export const Login = () => {
  const userMailRef = useRef();
  const userPasswordRef = useRef();
  const dispatch = useDispatch();
  const submit = async (evt) => {
    evt.preventDefault();
    try {
      //Ref 현재값 가져옴
      const userMail = userMailRef.current.value;
      const userPassword = userPasswordRef.current.value;
      //axios로 서버에 post요청
      await axios.post('http://localhost:5000/login', {
        userMail,
        userPassword,
      }).then((res)=> {
        // 리덕스에 role 저장
        dispatch(setUserName(res.data.userName));
         //로컬스토리지 x_auth에 토큰 저장
        localStorage.setItem('x_auth', res.data.token);
        alert(`${res.data.message}`);
      })
    }
    catch(e){
      console.log(e)
    }
  }
  return (    
  <div>
      <div>
        <Link to='/Home'>홈</Link>
        <Kakao />
      </div>
          <p>이메일</p>
          <input type='text' ref={userMailRef}></input>
          <p>비밀번호</p>
          <input type='password' ref={userPasswordRef}></input>
        <br />
        <button type='submit' onClick={submit}>
          로그인
        </button>
    </div>)
}