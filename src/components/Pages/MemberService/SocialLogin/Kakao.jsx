import axios from 'axios';
import KakaoLogin from 'react-kakao-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserName } from '../../../../redux/reducer/userNameActions';
import Endpoint from '../../../../config/Endpoint';

export const Kakao = () => {
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kakaoClientId = '8b2c41b57c3c1eae414552e99b435ce6'; //차후 따로 관리예정
  const kakaoSuccess = async (data) => {
    const userMail = data.profile.id; //카카오아이디
    const userName = data.profile.properties.nickname; //카카오 닉네임
    // 리덕스에 userName 저장
    dispatch(setUserName(data.profile.properties.nickname));
    await axios.post(
      `${endpoint}/login/kakao`, {
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
    <KakaoLogin style={{  width: '100%',
  backgroundColor: 'white',
  color: 'var(--Black)', /* 텍스트 색상 */
  padding: '10px 20px', /* 내부 여백 */
  border: 'none', /* 테두리 제거 */
  cursor: 'pointer', /* 커서 스타일 */
  borderRadius: '5px', /* 둥근 모서리 */
  boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)'}} token={kakaoClientId} onSuccess={kakaoSuccess} onFail={kakaoFail} />
    </div>
  )
}

