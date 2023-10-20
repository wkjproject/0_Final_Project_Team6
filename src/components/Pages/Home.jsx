import './Home.css';
import React from 'react';
import Slide from '../Slide/Slide';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjApiProvider } from '../../context/ProjectsApiContext';
import ProjectRanking from './ProjectRanking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5,
    },
  },
});

export default function Home() {
  return (
    <>
      <ProjApiProvider>
        <QueryClientProvider client={queryClient}>
          <div className='contents'>
            <Slide />
            <div className='project-container'>
              <Outlet />
              <ProjectRanking />
            </div>
          </div>
        </QueryClientProvider>
      </ProjApiProvider>
    </>
  );
}
