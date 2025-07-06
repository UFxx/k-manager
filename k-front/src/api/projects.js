import apiClient from "../services/api";

export default {
	fetchProjects: async () =>
	{
		return (await apiClient.get(`/projects`)).data;
	},
	createNewProject: async () =>
	{
		return (await apiClient.post(`/projects`)).data;
	},
	deleteProject: async (projectId) =>
	{
		return (await apiClient.delete(`/projects/${projectId}`)).data;
	},
	renameProject: async (payload) =>
	{
		return (await apiClient.patch(`/projects`, {...payload})).data;
	},
}