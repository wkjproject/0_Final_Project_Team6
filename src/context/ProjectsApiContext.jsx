import { createContext, useContext } from 'react';
import Projects from '../api/projects';
import JsonServerClient from '../api/jsonsSrverClient';

export const ProjectsApiContext = createContext();

// const client = new MongodbClient();
const client = new JsonServerClient();
const projects = new Projects(client);

export function ProjApiProvider({ children }) {
  return (
    <ProjectsApiContext.Provider value={{ projects }}>
      {children}
    </ProjectsApiContext.Provider>
  );
}

export function useProjectsApi() {
  console.log('useProjectsApi:', ProjectsApiContext);
  return useContext(ProjectsApiContext);
}
