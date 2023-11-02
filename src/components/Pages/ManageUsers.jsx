// 회원관리 페이지(서비스 관리자)
// 필요 데이터: 총 인원, 순번 | 이름(userName) | 이메일(userMail) | 연락처(userPhoneNum) | 주소(userAddr)

import React, { useState, useEffect } from 'react';
import TopBtn from '../TopBtn/TopBtn';
import axios from 'axios';
import Endpoint from '../../config/Endpoint';
import '../../css/ManageUsers.css';

export default function ManageUsers() {
  const [usersInfo, setUsersInfo] = useState([]); // 몽고DB에서 불러온 데이터 관련
  const [sortKey, setSortKey] = useState(null);   // 회원 정렬 Key
  const [userMail, setUserMail] = useState(null);
  const [activeSort, setActiveSort] = useState(null); // 탭 활성화 여부

	const endpoint = Endpoint();

  useEffect(() => {
    axios.get(`${endpoint}/usersInfo`)
      .then((res) => {
        setUsersInfo(res.data); // 가져온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, []);

  // console.log(`usersInfo: ${typeof(usersInfo)}`);
  // console.log(JSON.stringify(usersInfo));

  const userSort = (key) => {
    setSortKey(key);
    setActiveSort(key);
  };

  // 회원정보 정렬조건 함수
  const sortedUserList = [...usersInfo]
    .filter(user => user.role === 0 && user.userName !== undefined)
    .sort((a, b) => {
      if (sortKey === 'userName') {return a.userName.localeCompare(b.userName);} 
      else if (sortKey === 'userMail') {return a.userMail.localeCompare(b.userMail);} 
      else if (sortKey === 'userPhoneNum') { 
        if (a.userPhoneNum && b.userPhoneNum) {return a.userPhoneNum.localeCompare(b.userPhoneNum);} 
        // 연락처가 없을 경우(undefined) --> 'N/A'로 표시하고 맨 아래로 정렬
        else if (!a.userPhoneNum && b.userPhoneNum) {return 1;} 
        else if (a.userPhoneNum && !b.userPhoneNum) {return -1;}
      }
      return 0;
    });

    const byeUser = (userMail) => {
      setUserMail(userMail)
      alert(`해당 회원을 탈퇴시키겠습니까? 회원이메일아이디: ${userMail}`);
      byeUserDB(userMail);
      
    }
    const byeUserDB = async (userMail) => {
      // userMail 기준으로 DB에서 삭제
      await axios
      .post(`${endpoint}/byeUserDB`, {userMail})
      .then((res) => {
        if(res.data.byeUserSuccess) {
          alert(res.data.message);
          window.location.reload();
        }})}

	return (
		<div className='user-container'>
      <TopBtn />
			<h1>회원관리</h1>
      <p>(총 회원수: {sortedUserList.length}명)</p>
			<div className='user-list'>
        <div className="sort-tabs">
          <ul>
            <li 
            onClick={() => userSort('userName')} 
            className={activeSort === 'userName' ? 'active' : ''}
            >이름순</li>
            <li 
            onClick={() => userSort('userMail')}
            className={activeSort === 'userMail' ? 'active' : ''}
            >이메일순</li>
            <li 
            onClick={() => userSort('userPhoneNum')}
            className={activeSort === 'userPhoneNum' ? 'active' : ''}
            >연락처순</li>
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
              <th>회원 탈퇴 처리</th>
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
                <td ><button onClick={()=> byeUser(user.userMail)}>회원탈퇴</button></td>
              </tr>
            ))}
          </tbody>
        </table>
			</div>
		</div>
    
	)
}