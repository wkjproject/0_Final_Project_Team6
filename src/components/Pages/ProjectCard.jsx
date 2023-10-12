import React from "react";
import Thumbnail from './Thumbnail';
import './Home.css';

export default function ProjectCard({image, location, title, price, dday, isNew}) {
  return (
  <div className="project-card">
    <Thumbnail image={image} isNew={isNew}/>
    <h3>{title}</h3>
    <p>{location}</p>
    <p>{price}</p>
    <p>{dday}</p>

  </div>
  )
}
