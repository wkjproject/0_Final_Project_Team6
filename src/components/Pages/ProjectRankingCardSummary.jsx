import React from 'react';

export default function ProjectRankingCardSummary(props) {
  return (
    <div className='project-ranking-card-summary'>
      <h5 className='pcr-title'>{props.projName}</h5>
      <span className='pcr-location'>{props.location}</span>
      <span className=''> | </span>
      <span className='pcr-price'>
        {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </span>
      {/* <p>
        {props.projFundCollect}, {props.projLike}
      </p> */}
      {props.cancelPay ? (
        <div className='fundingProjectPlaceContainer'>
          <button
            class='fundingProjectPlaceCancelPayBtn'
            onClick={props.cancelPay}
          >
            결제취소
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
