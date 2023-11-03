import React from 'react';
import ProjectList from './ProjectsList';
import { useLocation, useParams } from 'react-router-dom';

export default function SearchPage() {
  const { keyword } = useParams();
  return (
    <>
      <ProjectList listType='searchPage' keyword={keyword} />
    </>
  );
}
