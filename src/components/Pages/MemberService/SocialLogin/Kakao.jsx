import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../../../../redux/reducer/userNameActions';
import Endpoint from '../../../../config/Endpoint';
import { setUserData } from '../../../../redux/reducer/userDataAction';

export const Kakao = () => {
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kakaoClientId = '8b2c41b57c3c1eae414552e99b435ce6';

  const kakaoSuccess = async (data) => {

    const userMail = data.profile.id;
    const userName = data.profile.properties.nickname;
    dispatch(setUserName(data.profile.properties.nickname));

    await axios.post(
      `${endpoint}/login/kakao`, {
        userName,
        userMail,
      }
    ).then((res) => {
      if (res.data.kakaoLoginSuccess) {
        dispatch(setUserData(res.data));
        localStorage.setItem('x_auth', res.data.accessToken);
        navigate('/home')
      }
    });
  }

  const kakaoFail = (err) => {
    console.log(err);
  };

  return (
    <div>
      <KakaoLogin
        style={{
          width: '100%',
          border: 'none',
        }}
        token={kakaoClientId}
        onSuccess={kakaoSuccess}
        onFail={kakaoFail}
      ><button className='socialLogin'>
        카카오로 로그인하기
      </button></KakaoLogin>

    </div>
  );
}