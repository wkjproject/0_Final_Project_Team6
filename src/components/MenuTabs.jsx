import React, { Component } from 'react';
import useFetch from '../components/hooks/useFetch';
import './MenuTabs.css'

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
                        QnA
                    </li>
                    <li
                        className={this.state.activeTab === 'tab4' ? 'active' : ''}
                        onClick={() => this.handleTabClick('tab4')}
                    >
                        회사 소개
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

    const ProjectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); //api
    if (ProjectData !== undefined && ProjectData !== null && ProjectData.length) { // 데이터가 언디파인이 아니거나 존재하거나 데이터가 조회되면
    }

    return (
        <div>
            {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
                ProjectData.map((item) => (
                    <div dangerouslySetInnerHTML={{ __html: item.projDesc }} />
                ))}
        </div>

    );
}

function Tab2Content() {
    return (
        <div>코멘트 페이지 추가 예정</div>
    );
}

function Tab3Content() {
    return (
        <div>QnA 페이지 추가 예정</div>
    );
}

function Tab4Content() {
    return (
        <div>회사소개 페이지 추가 예정</div>
    );
}

export default MenuTabs;