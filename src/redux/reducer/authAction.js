import axios from 'axios';

export const setAuth = () => {
  // 로컬스토리지에서 토큰을 가져오는 부분을 추가
  const token = localStorage.getItem('x_auth');

  // 헤더에 토큰을 포함하여 요청을 보내도록 수정
  const request = axios
    .get('http://localhost:5000/auth', {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 스키마를 사용하는 토큰 전달
      },
    })
    .then((res) => res.data);

  return {
    type: 'SET_AUTHUSER',
    payload: request,
  };
};
