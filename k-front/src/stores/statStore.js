import { defineStore } from "pinia";
import tasksApi from '~/src/api/tasks';
import { ref, computed } from 'vue';
import { useToastsStore } from '~/src/stores/toastsStore';
import { formatDate } from '~/src/utils/dateFormatter.js';
import { TASK_STATUSES } from '~/src/constants/statuses';

export const useStatStore = defineStore('stat', () =>
{
	const toastsStore = useToastsStore();

	const createdTasksRaw = ref([]);
	const completedTasksRaw = ref([]);

	const getTasksStat = async () =>
	{
		const data = await tasksApi.fetchTasksStat();

		if (data.success)
		{
			createdTasksRaw.value = data.created_tasks;
			completedTasksRaw.value = data.completed_tasks;
		}
		else toastsStore.useToast(data.message, 'error');
		};

	const completedTasks = computed(() =>
	{
		if (!completedTasksRaw.value.length) return { labels: [], datasets: [] };

		const labels = completedTasksRaw.value.map(item => formatDate(item.completed_at));
		const counts = completedTasksRaw.value.map(item => item.count);

		return {
			labels,
			datasets: [
				{
					label: 'Завершённые задачи',
					data: counts,
				}
			]
		};
	});

	const createdTasks = computed(() =>
	{
		if (!createdTasksRaw.value.length) return { labels: [], datasets: [] };

		const labels = createdTasksRaw.value.map(item => TASK_STATUSES[item.status]?.name || 'Неизвестно');
		const counts = createdTasksRaw.value.map(item => item.count);
		const colors = createdTasksRaw.value.map(item => TASK_STATUSES[item.status]?.color || '#ccc');

		return {
			labels,
			datasets: [
				{
					label: 'Созданные задачи',
					data: counts,
					backgroundColor: colors
				}
			]
		};
	});

	return {
		createdTasks,
		completedTasks,
		getTasksStat
	};
});