import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Kakao } from './SocialLogin/Kakao';
import { setUserName } from '../../../redux/reducer/userNameActions';
import '../../../css/MemberService/Login.css'

export const Login = () => {
  const navigate = useNavigate();
  const userMailRef = useRef();  // 사용자에게 입력받은 userMail을 Ref로 통해서 추적해요
  const userPasswordRef = useRef(); // 사용자에게 입력받은 userPassword를 Ref로 통해서 추적해요
  const dispatch = useDispatch(); // useDispatch() 를 좀 더 편하게 쓰기위해서 dispatch 변수에다가 할당해요
  //submit는 로그인버튼이에요
  const submit = async (evt) => {
    evt.preventDefault(); // 버튼으로 만들어져있기때문에 눌렀을때 다른 작업을 못하게 막는거에요
    try {
      // Ref로 추적중인 입력데이터의 현재값을 불러오는거에요.
      const userMail = userMailRef.current.value;
      const userPassword = userPasswordRef.current.value;
      // axios로 서버에 post요청을 보내요
      // nodejs 서버 port를 5000번으로 해뒀어요. 그래서 http://localhost:5000이고 
      // 뒤에 login은 server/server.mjs 파일에 18번째 줄 app.post('/login', async (req, res) => { 에서
      // '/login' 으로 받아주고 있기 때문에 http://localhost:5000/login 인거에요. app.post('/start') 라고 해주시면 http://localhost:5000/start 가 돼요
      await axios.post('http://localhost:5000/login', {
        // 이 페이지에서 14~15번째 줄에 선언한 변수인 userMail, userPassword를 post로 nodejs에 보내는거에요.
        userMail,
        userPassword,
      }).then((res)=> {
        // 리덕스에 userName 저장해요. 
        // axios로 받은 응답데이터는 항상 then((인자)) 인자.data로 와요. 여기서는 제가 res로 썼기때문에 res.data로 와요.
        // res.data.userName에서 userName부분은 server.mjs 43줄에 보시면 userName: userFind.userName 을 가져오는 부분이에요.
        // setUserName은 src/redux/reducer/userNameActions.js 에 있어요
        // 이 페이지에서 dispatch를 사용해서 userNameActions에 있는 setUserName 에다가 보내는거에요.
        // userNameAction 에서 받은 데이터는 src/redux/reducer/userNameReducer.js 에서 case 'SET_USERNAME': 부분으로 넘어가게돼요
        // userNameAction 에서 정의한 type: 'SET_USERNAME', 이 부분의 SET_USERNAME과 userNameReducer 의 case 'SET_USERNAME' 의 SET_USERNAME이 같은쪽으로 넘어가는거에요
        // 리듀서는 redux/store.js 에 다 저장되어서 하나로 관리되고있어요.
        if(res.data.loginSuccess){
          // 리덕스에 userName 저장
          dispatch(setUserName(res.data.userName));

          //로컬스토리지 x_auth에 토큰 저장
          localStorage.setItem('x_auth', res.data.token);
          navigate('/home');
        }
        if(!res.data.loginSuccess){
          alert(res.data.message);
        }

      })
    }
    catch(e){
      console.log(e)
    }
  }
  return (    
      <div className='LoginContainer'>
      <h2>로그인</h2>
      <input className='LoginInput' type="text" ref={userMailRef} placeholder="이메일 입력" />
      <br />
      <input className='LoginInput' type="password" ref={userPasswordRef} placeholder="비밀번호 입력" />
      <br />
      <p className='LoginIdpwFind'><NavLink to="/IdpwFind">아이디/비밀번호 찾기</NavLink></p>
      <br />
      <button className='LoginButton' type="submit" onClick={submit}>
        로그인
      </button>
      <Kakao />
      <p>계정이 없나요? <NavLink to="/signup">회원가입</NavLink></p>
    </div>
  )
  }