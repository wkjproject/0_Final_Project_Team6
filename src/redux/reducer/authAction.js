import Cookies from 'js-cookie';
import axios from 'axios';
import Endpoint from '../../config/Endpoint';

export const setAuth = (_id) => {
  const endpoint = Endpoint();
  // 로컬스토리지에서 토큰을 가져오는 부분을 추가
  const token = localStorage.getItem('x_auth');
  const refreshToken = Cookies.get('refresh_token');
  // 헤더에 토큰을 포함하여 요청을 보내도록 수정
  const request = axios
    .get(`${endpoint}/auth`, {
      headers: {
        authorization: `Bearer ${token}`, // Bearer 스키마를 사용하는 토큰 전달
        'x-refresh-token': refreshToken, // 리프레쉬 토큰
      },
      params: { _id }, // _id를 쿼리 매개변수로 전달
    })
    .then((res) => res.data);

  return {
    type: 'SET_AUTHUSER',
    payload: request,
  };
};
