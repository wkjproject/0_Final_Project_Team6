import React from "react";
import Thumbnail from './Thumbnail';
import './Home.css';

export default function ProjectCard({projId, image, location, title, price, dday, sday, isNew, projStatus, maderId, MypageImageClass, MypageDivClass, MypageDivContent, place, cancelPay}) {

  return (
  <div className="project-card">
    <Thumbnail projId={projId} image={image} sday={sday} isNew={isNew} projStatus={projStatus} maderId={maderId} MypageImageClass={MypageImageClass} MypageDivClass={MypageDivClass} MypageDivContent={MypageDivContent} />
    <h5 className='pc-title'>{title}</h5>
    <span className='pc-location'>{location}</span>
    <span className=''> | </span>
    <span className='pc-price'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>

    {place ? (
    <div className='fundingProjectPlaceContainer'>
    <span>{place}</span>
    <br/>
    <button class='fundingProjectPlaceCancelPayBtn' onClick={cancelPay}>결제취소</button>
    </div>)
    :('')}



  </div>
  )
}
