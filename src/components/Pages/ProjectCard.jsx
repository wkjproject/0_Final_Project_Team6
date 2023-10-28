import React from 'react';
import Thumbnail from './Thumbnail';
import './Home.css';

export default function ProjectCard({
  projId,
  image,
  location,
  projName,
  price,
  dday,
  sday,
  isNew,
  projStatus,
  maderId,
  MypageImageClass,
  MypageDivClass,
  MypageDivContent,
  cancelPay,
  cancelLike,
}) {
  return (
    <div className='project-card'>
      <Thumbnail
        key={projId}
        projId={projId}
        projName={projName}
        image={image}
        sday={sday}
        isNew={isNew}
        projStatus={projStatus}
        maderId={maderId}
        MypageImageClass={MypageImageClass}
        MypageDivClass={MypageDivClass}
        MypageDivContent={MypageDivContent}
        cancelLike={cancelLike}
      />
      {projName ? <h5 className='pc-title'>{projName}</h5>:(<p style={{marginBottom:'8px'}}></p>)}
      <span className='pc-location'>{location}</span>
      <span className=''> | </span>
      <span className='pc-price'>
        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </span>

      {cancelPay && cancelPay ? (
        <div className='fundingProjectPlaceContainer'>
          <button class='fundingProjectPlaceCancelPayBtn' onClick={cancelPay}>
            결제취소
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
