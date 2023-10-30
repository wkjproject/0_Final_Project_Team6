import { createContext, useContext } from 'react';
import Projects from '../api/projects';
import { JsonServerClient, MongodbClient } from '../api/jsonsSrverClient';

export const ProjectsApiContext = createContext();

const client = new MongodbClient();
/* const client = new JsonServerClient(); */
const projects = new Projects(client);

export function ProjApiProvider({ children }) {
  return (
    <ProjectsApiContext.Provider value={{ projects }}>
      {children}
    </ProjectsApiContext.Provider>
  );
}

export function useProjectsApi() {
  return useContext(ProjectsApiContext);
}
