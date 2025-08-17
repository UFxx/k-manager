<script setup>
	import { onMounted } from 'vue';
	import { useTasksStore } from '~/src/stores/tasksStore';
	import CompletedTask from './CompletedTask.vue';

	const tasksStore = useTasksStore();
	onMounted(() => tasksStore.fetchCompletedTasks());
</script>

<template>
	<div class="container">
		<div class="completed-tasks__container">
			<CompletedTask
				v-for="(task, i) in tasksStore.completedTasks"
				:key="task.id"
				:taskId="task.id"
				:numeration="i + 1"
				:text="task.location"
				:importance="task.importance"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.container { padding-top: 50px; }

	.completed-tasks__container
	{
		padding: 20px;
		background-color: rgba($gray-color, 0.1);
		width: 350px;
		border-radius: 10px;
		border: 1px solid $white-color;
	}
</style>
