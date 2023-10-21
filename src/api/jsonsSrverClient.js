import axios from 'axios';

export default class JsonServerClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_JSON_SERVER_URL,
    });
  }

  async getProjects() {
    return this.httpClient.get('projects');
  }
}
