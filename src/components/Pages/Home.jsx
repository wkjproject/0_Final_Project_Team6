import './Home.css';
import React from 'react';
import Slide from '../Slide/Slide';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProjectsApiContext } from '../../context/ProjectsApiContext';
const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <div className='contents'>
        <Slide />
        <div className='project-container'>
          <ProjectsApiContext>
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </ProjectsApiContext>
          <div className='project-ranking-list'></div>
        </div>
      </div>
    </>
  );
}
