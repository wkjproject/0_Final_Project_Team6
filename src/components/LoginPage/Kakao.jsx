import axios from 'axios';
import KakaoLogin from 'react-kakao-login';

export const Kakao = () => {
  const kakaoClientId = '8b2c41b57c3c1eae414552e99b435ce6';
  const kakaoSuccess = async (data) => {
    console.log(data)
    const token = data.response.access_token;
    const userMail = data.profile.id; //카카오아이디
    localStorage.setItem('x_auth', token);
    await axios.post(
      'http://localhost:5000/login/kakao', {
        userMail,
        token,
      }
    ).then((res) => {
      console.log(res.data)
    });
  }
  const kakaoFail = (err) => {
    console.log(err);
  };
  return (
    <>
    <KakaoLogin token={kakaoClientId} onSuccess={kakaoSuccess} onFail={kakaoFail} />
    </>
  )
}