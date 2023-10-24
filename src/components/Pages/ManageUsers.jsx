// 회원관리 페이지(서비스 관리자)
// 필요 데이터: 총 인원, 순번 | 이름 | 이메일 | 연락처 | 주소

import React from 'react';
import useFetch from '../hooks/useFetch';
import '../../css/ManageUsers.css';

export default function ManageUsers() {
	const userData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/users");
	const userList = Object.values(userData); // 유저 값을 배열로

	return (
		<div className='user-container'>
			<h1>회원관리</h1>
			<div className='user-list'>
				{/* 총 회원수 출력 */}
        <p>총 회원수: {userList.filter(user => user.role === 0).length}</p>

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
            {userList
						.filter(user => user.role === 0)
						.map((user, index) => (
              <tr key={userList._id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.userMail}</td>
                <td>{user.userPhoneNum}</td>
                <td>{user.userAddr}</td>
              </tr>
            ))}
          </tbody>
        </table>
			</div>
		</div>
	)
}