import { $axios } from "../services/api";

export default {
	fetchTasks: async (projectId) =>
	{
		return (await $axios.get(`/tasks/project/${projectId}`)).data;
	},
	addTask: async (payload) =>
	{
		return (await $axios.post(`/tasks`,{...payload})).data;
	},
	deleteTask: async (taskId) =>
	{
		return (await $axios.delete(`/tasks/${taskId}`)).data;
	},
	editTask: async (payload) =>
	{
		return (await $axios.patch('/tasks', {...payload})).data;
	}
}