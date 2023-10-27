import React from 'react';
import ProjectList from './ProjectsList';
import { useLocation, useParams } from 'react-router-dom';

export default function SearchPage() {
  const { keyword } = useParams();
  const location = useLocation();
  // const { keyword } = location.state || {};
  return (
    <>
      {/* <div>SearchPage: {keyword}</div> */}
      <ProjectList listType='searchPage' keyword={keyword} />
    </>
  );
}
