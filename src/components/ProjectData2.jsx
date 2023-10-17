import React from 'react';
import useFetch from '../components/hooks/useFetch';
import MenuTabs from './MenuTabs';
import RewardSelect from './RewardSelect';
import { useLocation } from 'react-router';

function ProjectData2() {
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

    const { projName, projMainImgPath, shortDesc } = selectedProject;

    return (
        <div>
            <h1 className='titlealign'>{projName}</h1>
            <div className='center'>
                <div>
                    <div>
                        <img className='mainImage' src={projMainImgPath} alt='메인 사진'></img>
                    </div>
                    <div className='shortDesc'>
                        {shortDesc}
                    </div>
                    <div id='projDesc'>
                        <MenuTabs></MenuTabs>
                    </div>
                </div>
                <div className='RewardSelect'>
                    <RewardSelect></RewardSelect>
                </div>
            </div>
        </div>
    );
}

export default ProjectData2;
