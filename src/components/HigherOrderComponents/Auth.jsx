import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuth } from '../../redux/reducer/authAction';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    // 리덕스에서 _id 가져오기
    const _id = useSelector((state) => state._id._id);
    // 리덕스에서 isAdmin 가져오기
    const isAdmin = useSelector((state) => state.userData.userData.isAdmin)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const fetchData = async () => {
        const res = await dispatch(setAuth(_id));
        if(res.payload.accessToken !== '' && res.payload.accessToken.length >= 30){
          localStorage.removeItem('x_auth');
          localStorage.setItem('x_auth', res.payload.accessToken);
        }
        setLoading(false); // 요청이 완료되면 로딩 상태를 false로 변경

        //로그인 하지 않은 상태
        if (!res.payload.isLogin) {
          if (option) {
            navigate('/login', { state: { from: location.pathname } });
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !isAdmin) {
            navigate('/home');
          } else {
            if (option === false) {
              navigate('/home');
            }
          }
        }
      };

      fetchData();
    }, []);

    // 로딩 중인 동안 아무내용도 안띄우기
    if (loading) {
      return <div></div>;
    }

    return (
      <SpecificComponent {...props} />
    );
  }

  return AuthenticationCheck;
}