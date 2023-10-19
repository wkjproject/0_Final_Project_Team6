import React from "react"
import { useNavigate } from 'react-router';

export default function Thumbnail ({projId, image, isNew, MypageImageClass, MypageDivClass, MypageDivContent}) {
  //console.log('Thumbnail image: ', image);
  //console.log('Thumbnail isNew: ', isNew);

  const navigate = useNavigate();
  const openProjDetails = () => {
    //console.log(`project_id: ${projId}`);
    navigate("/project2", { state: { _id: projId } });
  }

  return (
    <div className="thumbnail"  onClick={openProjDetails}>
      <img 
        className={`photo ${MypageImageClass}`}
        src={image}
        alt=''
      />
      <div className={`${MypageDivClass}`}>
        {MypageDivContent}
      </div>
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}

