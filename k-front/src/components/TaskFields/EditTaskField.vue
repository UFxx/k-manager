<script setup>
	import { useTasksStore } from '~/src/stores/tasksStore';

	const props = defineProps({
		taskId: {
			type: Number,
			required: true
		},
		projectIdx: {
			type: Number,
			required: true
		},
		canEditTask: {
			type: Boolean,
			required: true
		}
	})

	const emit = defineEmits(['toggleCanEditTask']);

	const tasksStore = useTasksStore();

	const deleteTask = () => tasksStore.deleteTask(props.taskId, props.projectIdx);
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
