import useFetch from '../../hooks/useFetch';
const apiUrl = process.env.REACT_APP_API_KEY;

//console.log(apiUrl);

function ProjectData() {

    const ProjectData = useFetch(apiUrl); //api
    if (ProjectData !== undefined && ProjectData !== null && ProjectData.length) { // 데이터가 언디파인이 아니거나 존재하거나 데이터가 조회되면
        //console.log(ProjectData);
        //console.log(ProjectData[0]);
        //console.log(apiUrl);
    }

    return (
        <div>
            {ProjectData !== undefined && ProjectData !== null && ProjectData.length > 0 &&
                ProjectData.map((item) => (
                    <div>
                        {item._id.$oid}
                        <br />
                        {item.projName}
                        <br />
                        {item.projMainImgPath}
                        <br />
                        {item.projDetailImgPath}
                        <br />
                        {item.projIntro}
                        <br />
                        {item.projDescription}
                        <br />
                        {item.projTag}
                        <hr />
                    </div>
                ))
            }

        </div>
    );
}

export default ProjectData