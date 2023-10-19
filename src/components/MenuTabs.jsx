import React, { Component } from 'react';
import useFetch from '../components/hooks/useFetch';
import './MenuTabs.css'
import { useLocation } from 'react-router';

class MenuTabs extends Component {

    constructor() {
        super();
        this.state = {
            activeTab: 'tab1', // 초기 활성 탭 설정
        };
    }

    // 메뉴 항목을 클릭할 때 호출되는 핸들러
    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        return (
            <div>
                <ul className="tab-list">
                    <li
                        className={this.state.activeTab === 'tab1' ? 'active' : ''}
                        onClick={() => this.handleTabClick('tab1')}
                    >
                        소개글
                    </li>
                    <li
                        className={this.state.activeTab === 'tab2' ? 'active' : ''}
                        onClick={() => this.handleTabClick('tab2')}
                    >
                        코멘트
                    </li>
                    <li
                        className={this.state.activeTab === 'tab3' ? 'active' : ''}
                        onClick={() => this.handleTabClick('tab3')}
                    >
                        Q&A
                    </li>
                    <li
                        className={this.state.activeTab === 'tab4' ? 'active' : ''}
                        onClick={() => this.handleTabClick('tab4')}
                    >
                        주최자 소개
                    </li>
                </ul>
                <div className="tab-content">
                    {this.state.activeTab === 'tab1' && <Tab1Content />}
                    {this.state.activeTab === 'tab2' && <Tab2Content />}
                    {this.state.activeTab === 'tab3' && <Tab3Content />}
                    {this.state.activeTab === 'tab4' && <Tab4Content />}
                </div>
            </div>
        );
    }
}

// 각 탭에 대한 컴포넌트
function Tab1Content() {

    const location = useLocation();
    const { _id } = location.state || {};

    const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects");

    if (!projectData) {
        return <div>Loading...</div>;
    }

    // "proj_id" 값을 기반으로 해당 "projName"을 찾기
    const selectedProject = projectData.find(item => item.proj_id === _id);

    if (!selectedProject) {
        return <div>Project not found</div>;
    }

    const { projDesc } = selectedProject;

    return (
        <div className='projDesc'>
            <div dangerouslySetInnerHTML={{ __html: projDesc }} />
        </div>

    );
}

function Tab2Content() {
    //QnA와 코멘트 페이지는 json서버에서 받아오는 형식. 고정적으로 처리할 예정
    const ProjectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); //api

    return (
        <div>
            {ProjectData.map((item) => (
                <div dangerouslySetInnerHTML={{ __html: item.comment }} />
            ))}
        </div>

    );
}

function Tab3Content() {
    //QnA와 코멘트 페이지는 json서버에서 받아오는 형식. 고정적으로 처리할 예정
    const ProjectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); //api

    return (
        <div>
            {ProjectData.map((item) => (
                <div dangerouslySetInnerHTML={{ __html: item.QnA }} />
            ))}
        </div>

    );
}

function Tab4Content() {
    const location = useLocation();
    const { _id } = location.state || {};

    const projectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects");
    const usersData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/users");


    if (!projectData) {
        return <div>Loading...</div>;
    }

    // "proj_id" 값을 기반으로 해당 "userMade_id"를 찾기
    const selectedProject = projectData.find(item => item.proj_id === _id);

    if (!selectedProject) {
        return <div>Project not found</div>;
    }

    const { userMade_id } = selectedProject;

    console.log(`프로젝트 만든 아이디 : ${userMade_id}`);


    if (!usersData) {
        return <div>Loading...</div>;
    }

    // "userMade_id" 값을 기반으로 해당 "users_id"를 찾기
    const selectedUser = usersData.find(item => item.users_id === userMade_id);

    if (!selectedUser) {
        return <div>User not found</div>;
    }

    const { users_id, userName, userMail, userPhoneNum } = selectedUser;

    console.log(`프로젝트를 등록한 아이디 : ${users_id}`);

    return (
        <div className='makerIntro'>
            <h1>주최자</h1>
            <br />

            <table className='makerTable'>
                <tr>
                    <td>이름 </td>
                    <td> : </td>
                    <td>{userName}</td>
                </tr>
                <tr>
                    <td>메일 주소 </td>
                    <td> : </td>
                    <td>{userMail}</td>
                </tr>
                <tr>
                    <td>연락처 </td>
                    <td> : </td>
                    <td>{userPhoneNum}</td>
                </tr>
            </table>
        </div>
    );
}


export default MenuTabs;