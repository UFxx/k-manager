<script setup>
	import { inject } from 'vue';

	import tasksApi from '~/src/api/tasks';
	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore()

	const props = defineProps({
		taskId: {
			type: Number,
			required: true
		},
		canEditTask: {
			type: Boolean,
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
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const emit = defineEmits(['toggleCanEditTask']);
</script>

<template>
	<td>
		<button
			v-if="!props.canEditTask"
			@click="emit('toggleCanEditTask')"
		>
			<Icon
				path="edit.svg"
				size="small"
			/>
		</button>
		<template v-else>
			<button @click="emit('toggleCanEditTask', 'edit')">
				<Icon
					path="check.svg"
					size="small"
				/>
			</button>
			<button @click="emit('toggleCanEditTask', 'cancel')">
				<Icon
					path="times.svg"
					size="small"
				/>
			</button>
			<button @click="deleteTask">
				<Icon
					path="trash.svg"
					size="small"
				/>
			</button>
		</template>
	</td>
</template>
