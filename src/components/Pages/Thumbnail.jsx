import React from "react"
import { useNavigate } from 'react-router';

export default function Thumbnail ({image, isNew}) {
  //console.log('Thumbnail image: ', image);
  //console.log('Thumbnail isNew: ', isNew);

  const navigate = useNavigate();
  const openProjDetails = () => {
    navigate("/project2");
  }

  return (
    <div className="thumbnail"  onClick={openProjDetails}>
      <img 
        className="photo"
        src={image}
        alt=''
        />
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}

