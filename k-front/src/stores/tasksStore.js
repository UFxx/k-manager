import { defineStore } from 'pinia';
import { ref } from 'vue';
import tasksApi from '~/src/api/tasks';
import { useToastsStore } from '~/src/stores/toastsStore';

export const useTasksStore = defineStore('tasks', () =>
{
	const toastsStore = useToastsStore();
	const tasks = ref([]);
	const selectedTasks = ref([]);
	const filteredTasks = ref([]);
	const completedTasks = ref([]);

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

	const fetchCompletedTasks = async () =>
	{
		const data = await tasksApi.fetchCompletedTasks();

		if (data.success)
		{
			completedTasks.value = data.tasks;
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const addTask = async (projectId, projectIdx) =>
	{
		const payload = { projectId: projectId };
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
		const payload = { ...task, taskId };
		const data = await tasksApi.editTask(payload);

		if (data.success)
		{
			const affectedTaskIdx = tasks.value[projectIdx].findIndex(task => task.id === taskId);
			tasks.value[projectIdx][affectedTaskIdx] = data.task;
			toastsStore.useToast(data.message, 'info');

			if (data.task.status === 3)
				tasks.value[projectIdx] = tasks.value[projectIdx].slice(0, affectedTaskIdx);
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


	const bulkDelete = async () =>
	{
		if (selectedTasks.value.length < 1) return toastsStore.useToast('Задач не выбрано', 'error');

		const payload = { taskIds: selectedTasks.value.map(t => t.id) }
		const data = await tasksApi.bulkDelete(payload);

		if (data.success)
		{
			const selectedTaskIds = selectedTasks.value.map(task => task.id);

			tasks.value = tasks.value.map(project => project.filter(task => !selectedTaskIds.includes(task.id)));
			selectedTasks.value = [];

			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const changeTaskSelection = (taskId, projectIdx) =>
	{
		const getTaskIdx = tasks.value[projectIdx].findIndex(task => task.id === taskId);
		const task = tasks.value[projectIdx][getTaskIdx];
		task.isSelected = !task.isSelected;

		if (task.isSelected)
			selectedTasks.value.push(task);
		else
			selectedTasks.value = selectedTasks.value.filter(task => task.id !== taskId)
	}

	const currentFilter = ref(null);

	const filterTasks = (filter) =>
	{
		const { filterName, filterCode, filterItemName } = filter;

		currentFilter.value = { filterName, filterValue: filterItemName };

		if (filterName === 'По важности')
			filteredTasks.value = tasks.value.map(project => project.filter(task => task.importance === filterCode));
		else if (filterName === 'По статусу')
			filteredTasks.value = tasks.value.map(project => project.filter(task => task.status === filterCode));
		else return;
	}

	const clearFilters = () =>
	{
		filteredTasks.value = [];
		currentFilter.value = null;
	};

	const searchTasks = (query) =>
	{
		filteredTasks.value = tasks.value.map(project => project.filter(task =>
		{
			if (!query.length) return task;
			if (task.location === null) return;

			return task.location.trim().toLowerCase().startsWith(query.trim().toLowerCase());
		}
		));
	}

	return {
		tasks,
		selectedTasks,
		filteredTasks,
		fetchTasks,
		fetchCompletedTasks,
		addTask,
		editTask,
		deleteTask,
		bulkDelete,
		changeTaskSelection,
		filterTasks,
		clearFilters,
		currentFilter,
		searchTasks
	};
})