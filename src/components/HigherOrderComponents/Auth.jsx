import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/reducer/authAction';

export default function Auth(SpecificComponent, option, adminRoute = null) {

  //option page
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인 한 유저는 출입 불가능한 페이지
  //adminRoute true 하면 관리자만 출입가능
  // ex) <Route exact path="/" component={Auth(LandingPage, null)} />
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(setAuth()).then(res => {
        console.log(res);
      })
    })
    /* useEffect(() => {
      dispatch(setAuth()).then(res => {
        console.log(res)

        //로그인 하지 않은 상태
        if(!res.payload.isLogin) {
          if(option) {
            navigate('/login')
          }
        } else {
          //로그인 한 상태
          if(adminRoute && !res.payload.isAdmin) {
            navigate('/')
          } else {
            if(option === false) {
              navigate('/')
            }
          }
        }
      })
    }, []) */

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck;
}