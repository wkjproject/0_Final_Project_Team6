import React from 'react';
import './Home.css';
import ProjectRankingThumbnail from './ProjectRankingThumbnail';
import ProjectRankingCardSummary from './ProjectRankingCardSummary';

export default function ProjectRankingCard(props) {
  return (
    <div className='project-ranking-card'>
      <ProjectRankingThumbnail {...props} />
      <ProjectRankingCardSummary {...props} />
    </div>
  );
}
