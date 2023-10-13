import React from "react";
import Thumbnail from './Thumbnail';
import './Home.css';

export default function ProjectCard({image, location, title, price, dday, isNew}) {
  return (
  <div className="project-card">
    <Thumbnail image={image} isNew={isNew}/>
    <h5 className='pc-title'>{title}</h5>
    <p className='pc-location'>{location} | <span className='pc-price'>{price}원</span></p>
    
  </div>
  )
}
