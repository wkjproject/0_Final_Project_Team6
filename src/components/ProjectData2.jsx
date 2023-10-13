import React from 'react';
import useFetch from '../components/hooks/useFetch';
import MenuTabs from './MenuTabs';
import RewardSelect from './RewardSelect';


//const apiUrl = process.env.REACT_APP_API_KEY;

//console.log(apiUrl);

function ProjectData2() {

    const ProjectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); //api
    if (ProjectData !== undefined && ProjectData !== null && ProjectData.length) { // 데이터가 언디파인이 아니거나 존재하거나 데이터가 조회되면
        //console.log(ProjectData);
        //console.log(ProjectData[0]);
    }

    return (
        <div>
            {ProjectData.map((item) => (
                <div>
                    <hr />
                    <h1 className='titlealign'>{item.projName}</h1>
                    <div className='center'>
                        <div>
                            <img className='mainImage' src={item.projMainImgPath} alt='메인 사진'></img>
                            <div id='projDesc'>
                                <MenuTabs></MenuTabs>
                            </div>
                        </div>
                        <div>
                            <RewardSelect></RewardSelect>
                        </div>
                    </div>
                </div >
            ))
            }

        </div >
    );
}

export default ProjectData2