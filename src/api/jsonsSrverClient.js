import axios from 'axios';

export class JsonServerClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_JSON_SERVER_URL,
    });
  }

  async getProjects() {
    return this.httpClient.get('projects');
  }
}

export class MongodbClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_LOCAL_SERVER_URL
          : process.env.REACT_APP_MONGODB_SERVER_URL,
    });
  }

  async getProjects() {
    return this.httpClient.get('projects');
  }
}
