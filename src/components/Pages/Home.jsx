import './Home.css';
import React from 'react';
import Slide from '../Slide/Slide';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/* import { ProjApiProvider } from '../../context/ProjectsApiContext'; */
const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <div className='contents'>
        <Slide />
        <div className='project-container'>
{/*           <ProjApiProvider> */}
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
{/*           </ProjApiProvider> */}
          <div className='project-ranking-list'></div>
        </div>
      </div>
    </>
  );
}
