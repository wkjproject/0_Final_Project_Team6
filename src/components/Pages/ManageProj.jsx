import React, { useState } from 'react';
import '../../css/ManageProj.css';
import ProjectList from './ProjectsList';

export default function ManageProj() {
  const [activeTab, setActiveTab] = useState('waiting');	// 기본값: 승인대기 프로젝트

  // 탭을 클릭할 때 호출되는 함수
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <h1>프로젝트 관리</h1>
      <div className="tabs">
        {/* 승인 대기 프로젝트 탭 */}				
        <ul>
					<li
						className={`tab ${activeTab === 'waiting' ? 'active' : ''}`}
						onClick={() => handleTabClick('waiting')}
					>
						승인 대기 프로젝트
					</li>
					{/* 진행 중 프로젝트 탭 */}
					<li
						className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
						onClick={() => handleTabClick('ongoing')}
					>
						진행 중 프로젝트
					</li>
					{/* 마감된 프로젝트 탭 */}
					<li
						className={`tab ${activeTab === 'ended' ? 'active' : ''}`}
						onClick={() => handleTabClick('ended')}
					>
						마감된 프로젝트
					</li>
				</ul>
      </div>

      {/* 선택된 탭에 따라 내용을 표시 */}
      {activeTab === 'waiting' && (
        <div>
          <p>승인대기 프로젝트 내용</p>
					<div className="project-container">
						<ProjectList />
					</div>
        </div>
      )}
      {activeTab === 'ongoing' && (
        <div>
          {/* 진행중 내용 */}
					<p>진행 중 프로젝트 내용</p>
        </div>
      )}
      {activeTab === 'ended' && (
        <div>
          {/* 마감된 내용 */}
					<p>마감된 프로젝트 내용</p>
        </div>
      )}
    </div>
  );
}
