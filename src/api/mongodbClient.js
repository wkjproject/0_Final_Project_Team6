import axios from 'axios';

export default class MongodbClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_MONGODB_SERVER_URL,
    });
  }

  async getProjects(params) {
    return this.httpClient.get('projects', params);
  }
}
