// 회원관리 페이지(서비스 관리자)
// 필요 데이터: 총 인원, 순번 | 이름 | 이메일 | 연락처 | 주소
// userId, userName, userMail, userPhoneNum, userAddr

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoint from '../../config/Endpoint';
import '../../css/ManageUsers.css';
// import useFetch from '../hooks/useFetch';

export default function ManageUsers() {
	// const userData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/users");
	// const userList = Object.values(userData); // 유저 값을 배열로
	
  const [usersInfo, setUsersInfo] = useState([]); // 몽고DB에서 불러온 데이터 관련
  const [sortKey, setSortKey] = useState(null);   // 회원 정렬 Key

  useEffect(() => {
    const endpoint = Endpoint();
    axios.get(`${endpoint}/usersInfo`)
      .then((res) => {
        setUsersInfo(res.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  console.log(`usersInfo: ${typeof(usersInfo)}`);
  // console.log(JSON.stringify(usersInfo));

  const userSort = (key) => {
    setSortKey(key);
  };


  const sortedUserList = [...usersInfo]
    .filter(user => user.role === 0 && user.userName !== undefined)
    .sort((a, b) => {
      if (sortKey === 'userName') {
        return a.userName.localeCompare(b.userName);
      } else if (sortKey === 'userMail') {
        return a.userMail.localeCompare(b.userMail);
      } else if (sortKey === 'userPhoneNum') {  // 연락처가 없을 경우 --> 'N/A'로 표시하고 맨 아래로 정렬
        if (a.userPhoneNum && b.userPhoneNum) {
          return a.userPhoneNum.localeCompare(b.userPhoneNum);
        } else if (!a.userPhoneNum && b.userPhoneNum) {
          return 1; // a가 undefined일 경우 b를 더 높게 정렬
        } else if (a.userPhoneNum && !b.userPhoneNum) {
          return -1; // b가 undefined일 경우 a를 더 높게 정렬
        }
      }
      return 0;
    });

	return (
		<div className='user-container'>
			<h1>회원관리</h1>
			<div className='user-list'>
        <p>( 총 회원수: {sortedUserList.length}명 )</p>
        <div className="sort-tabs">
          <ul>
            <li onClick={() => userSort('userName')}>이름순</li>
            <li onClick={() => userSort('userMail')}>이메일순</li>
            <li onClick={() => userSort('userPhoneNum')}>연락처순</li>
          </ul>
        </div>
        {/* 사용자 목록을 표(테이블)로 표시 */}
        <table className='user-table'>
          <thead>
            <tr>
              <th>순번</th>
              <th>이름</th>
              <th>이메일</th>
              <th>연락처</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {sortedUserList.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.userMail}</td>
                <td>{user.userPhoneNum || 'N/A'}</td> {/* 연락처가 없을 경우 'N/A'로 표시 */}
                <td>{user.userAddr}</td>
              </tr>
            ))}
          </tbody>
        </table>
			</div>
		</div>
	)
}