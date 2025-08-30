import { defineStore } from "pinia";
import tasksApi from '~/src/api/tasks';
import { ref, computed } from 'vue';
import { useToastsStore } from '~/src/stores/toastsStore';
import { formatDate } from '~/src/utils/dateFormatter.js';

export const useStatStore = defineStore('stat', () =>
{
	const toastsStore = useToastsStore();

	const statByCreatedTasks   = ref(null);
	const completedTasksLabels = ref([]);
	const completedTasksData   = ref([]);

	const getTasksStat = async () =>
	{
		const data = await tasksApi.fetchTasksStat();

		if (data.success)
		{
			statByCreatedTasks.value = data.created_tasks;

			const labels = data.completed_tasks.map(obj => formatDate(obj.completed_at));
			const counts = data.completed_tasks.map(obj => obj.count);

			completedTasksLabels.value = labels;
			completedTasksData.value = counts;
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const completedTasks = computed(() => ({
		labels: [ ...completedTasksLabels.value ],
		datasets: [
			{
				label: 'Сделанные',
				data : [ ...completedTasksData.value ]
			}
		]
	}));

	return {
		statByCreatedTasks,
		completedTasks,
		getTasksStat
	};
})