import React from "react"

export default function Thumbnail ({image, isNew}) {
  //console.log('Thumbnail image: ', image);
  //console.log('Thumbnail isNew: ', isNew);
  return (
    <div className="thumbnail">
      <img 
        className="photo"
        src={image}
        alt=''
        />
      {isNew && <span className='new-tag'>new</span>}
    </div>
  );
}

