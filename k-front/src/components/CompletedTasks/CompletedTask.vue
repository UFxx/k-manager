<script setup>
	import { useTasksStore } from '~/src/stores/tasksStore';

	const props = defineProps({
		taskId: {
			type: Number,
			required: true
		},
		projectId: {
			type: Number,
			required: true
		},
		numeration: {
			type: Number,
			required: true
		},
		text: {
			type: String,
			default: '',
			required: false
		},
		importance: {
			type: Number,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	})

	const tasksStore = useTasksStore();
	const deleteCompletedTask = () => tasksStore.deleteCompletedTask(props.taskId);
	const returnCompletedTask = () => tasksStore.returnCompletedTask(props.task);
</script>

<template>
	<div class="completed-task">
		<div class="completed-task__wr">
			<p>{{ numeration }}.</p>
			<div
				class="completed-task__content"
			>
				<p>{{ text }}</p>
			</div>
		</div>
		<div class="completed-task__buttons">
			<button>
				<Icon
					path="trash.svg"
					size="small"
					@click="deleteCompletedTask"
				/>
			</button>
			<button>
				<Icon
					path="return.svg"
					size="small"
					@click="returnCompletedTask"
				/>
			</button>
		</div>
	</div>
</template>

<style lang='scss'>
	.completed-task
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: 10px;
		padding-bottom: 10px;
	}

	.completed-task__content
	{
		padding: 5px 10px;
		border-radius: 10px;
		background-color: rgba(#7BFF00, 0.5);
	}

	.completed-task__wr
	{
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	.completed-task__buttons
	{
		display: flex;
		flex-direction: column;
	}
</style>