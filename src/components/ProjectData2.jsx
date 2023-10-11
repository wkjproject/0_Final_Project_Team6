import useFetch from '../components/hooks/useFetch';
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
            {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
                ProjectData.map((item) => (
                    <div>
                        <h1>{item.projName}</h1>
                        <div className='center'>
                            <div id='div1'><img id='mainImage' src={item.projMainImgPath} alt='메인 사진'></img></div>
                            <div id='div2'>
                                {item.projReward.map((reward) => (
                                    <div>
                                        <select className='select' name="">

                                            <option>
                                                마감일 : {reward.projRewardName}
                                                <br />
                                                리워드 금액 : {reward.projRewardAmount}원
                                                <br />
                                                리워드 갯수 : {reward.projRewardCount}개
                                                <br />
                                            </option>
                                        </select>
                                        마감일 : {reward.projRewardName}
                                        <br />
                                        <br />
                                        리워드 금액 : {reward.projRewardAmount}원
                                        <br />
                                        <br />
                                        리워드 갯수 : {reward.projRewardCount}개
                                        <br />
                                        <br />
                                    </div>
                                ))}
                                <div>
                                    펀딩 시작일 : {item.projFundDate[0].projFundStartDate}
                                    <br />
                                    <br />
                                    펀딩 마감일 : {item.projFundDate[0].projFundEndDate}
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                        {/* {item.proj_id}
                        <br />
                        {item.userMade_id}
                        <br />
                        {item.projName}
                        <br />
                        {item.projRegion}
                        <br />
                        {item.projMainImgPath}
                        <br />
                        {item.projDetailImgPath}
                        <br />
                        {item.projIntro}
                        <br />
                        {item.projDesc}
                        <br />
                        <hr /> */}
                        <div div id='projDesc' >
                            <div dangerouslySetInnerHTML={{ __html: item.projDesc }} />
                        </div>
                    </div >
                ))
            }

        </div >
    );
}

export default ProjectData2