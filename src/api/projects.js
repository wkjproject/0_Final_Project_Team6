export default class Projects {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return {};
  }
  async getProjects() {
    return this.apiClient.getProjects().then((res) => res.data.projects);
  }
}
