import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../../../../redux/reducer/userNameActions';

export const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kakaoClientId = '8b2c41b57c3c1eae414552e99b435ce6'; //차후 따로 관리예정
  const kakaoSuccess = async (data) => {
    const userMail = data.profile.id; //카카오아이디
    const userName = data.profile.properties.nickname; //카카오 닉네임
    // 리덕스에 userName 저장
    dispatch(setUserName(data.profile.properties.nickname));
    await axios.post(
      'http://localhost:5000/login/kakao', {
        userName,
        userMail,
      }
    ).then((res) => {
      if(res.data.kakaoLoginSuccess){
        localStorage.setItem('x_auth', res.data.token);
        navigate('/home')
      }
    });
  }
  const kakaoFail = (err) => {
    console.log(err);
  };
  return (
    <div>
    <KakaoLogin token={kakaoClientId} onSuccess={kakaoSuccess} onFail={kakaoFail} />
    </div>
  )
}