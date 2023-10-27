import React from 'react';
import ProjectList from './ProjectsList';
import ProjectRanking from './ProjectRanking';

export default function PopularProj() {
  return (
    <>
      <ProjectList listType='home' />
      <ProjectRanking />
    </>
  );
}
