<script setup>
	import { inject } from 'vue';
	import tasksApi from '~/src/api/tasks';

	const props = defineProps({
		taskId: {
			type: Number,
			required: true
		}
	})

	const tasks = inject('tasks');

	const deleteTask = async () =>
	{
		const data = await tasksApi.deleteTask(props.taskId);

		if (data.success)
		{
			tasks.value = tasks.value.filter(task => task.id !== props.taskId);
			console.log(data.message);
		}
		else console.log(data.message);
	}
</script>

<template>
	<td
		class="project-table__first-column"
		@click="deleteTask"
	>
		<button>-</button>
	</td>
</template>
