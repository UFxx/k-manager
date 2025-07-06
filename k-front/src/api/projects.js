import { $axios } from "../services/api";

export default {
	fetchProjects: async () =>
	{
		return (await $axios.get(`/projects`)).data;
	},
	createNewProject: async () =>
	{
		return (await $axios.post(`/projects`)).data;
	},
	deleteProject: async (projectId) =>
	{
		return (await $axios.delete(`/projects/${projectId}`)).data;
	},
	renameProject: async (payload) =>
	{
		return (await $axios.patch(`/projects`, {...payload})).data;
	},
}