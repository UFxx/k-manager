import apiClient from "../services/api";

export default {
	fetchTasks: async (projectId) =>
	{
		return (await apiClient.get(`/tasks/project/${projectId}`)).data;
	},
	addTask: async (payload) =>
	{
		return (await apiClient.post(`/tasks`,{...payload})).data;
	},
	deleteTask: async (taskId) =>
	{
		return (await apiClient.delete(`/tasks/${taskId}`)).data;
	},
	editTask: async (payload) =>
	{
		return (await apiClient.patch('/tasks', {...payload})).data;
	}
}