import { defineStore } from 'pinia';
import { ref } from 'vue';
import tasksApi from '~/src/api/tasks';
import { useToastsStore } from '~/src/stores/toastsStore';

export const useTasksStore = defineStore('tasks', () =>
{
	const toastsStore = useToastsStore();
	const tasks = ref([]);

	const fetchTasks = async (projectId) =>
		{
			const data = await tasksApi.fetchTasks(projectId);

			if (data.success)
			{
				tasks.value.push(data.tasks.map(task =>
				{
					return { ...task, isSelected: false };
				}))
			}
			else toastsStore.useToast(data.message, 'error');
		}

	const addTask = async (projectId, projectIdx) =>
	{
		const payload = { projectId: projectId }
		const data = await tasksApi.addTask(payload);

		if (data.success)
		{
			tasks.value[projectIdx].push(data.task);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const editTask = async (task, taskId, projectIdx) =>
	{
		const payload = { ...task, taskId }
		const data = await tasksApi.editTask(payload);

		if (data.success)
		{
			const affectedTaskIdx = tasks.value[projectIdx].findIndex(task => task.id === taskId);
			tasks.value[projectIdx][affectedTaskIdx] = data.task;
			toastsStore.useToast(data.message, 'info');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const deleteTask = async (taskId, projectIdx) =>
	{
		const data = await tasksApi.deleteTask(taskId);

		if (data.success)
		{
			tasks.value[projectIdx] = tasks.value[projectIdx].filter(task => task.id !== taskId);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	// projectIdx нужно прокинуть из project.vue
	// в компонент, который отвечает за их выделение
	// пока что я только вынес функцию
	const changeTaskSelection = (taskId, projectIdx) =>
	{
		const getTaskIdx = tasks.value.findIndex(task => task.id === taskId);
		const task = tasks.value[projectIdx][getTaskIdx];
		task.isSelected = !task.isSelected;
	}

	return { tasks, fetchTasks, addTask, changeTaskSelection, editTask, deleteTask };
})