import React from 'react';
import useFetch from '../components/hooks/useFetch';
import MenuTabs from './MenuTabs';
import RewardSelect from '../RewardSelect/RewardSelect';
import { useLocation } from 'react-router';

//const apiUrl = process.env.REACT_APP_API_KEY;

//console.log(apiUrl);

function ProjectData2() {

    const location = useLocation();
    const { _id } = location.state || {};

    //console.log(_id);

    const ProjectData = useFetch("https://json-server-vercel-sepia-omega.vercel.app/projects"); //api

    return (
        <div>
            {ProjectData.map((item) => (
                <div>
                    <hr />
                    <h1 className='titlealign'>{item.projName}</h1>
                    <div className='center'>
                        <div>
                            <div>
                                <img className='mainImage' src={item.projMainImgPath} alt='메인 사진'></img>
                            </div>
                            <div className='shortDesc'>
                                {item.shortDesc}
                            </div>
                            <div id='projDesc'>
                                <MenuTabs></MenuTabs>
                            </div>
                        </div>
                        <div className='RewardSelect'>
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