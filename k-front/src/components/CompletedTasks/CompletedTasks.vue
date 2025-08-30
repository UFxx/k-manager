<script setup>
	import { onMounted } from 'vue';
	import { useTasksStore } from '~/src/stores/tasksStore';
	import { useStatStore } from '~/src/stores/statStore';
	import CompletedTask from '@/CompletedTasks/CompletedTask.vue';
	import Stat from '@/Stat/Stat.vue';

	const tasksStore = useTasksStore();
	const statStore  = useStatStore();

	onMounted(() =>
	{
		tasksStore.fetchCompletedTasks();
		statStore.getTasksStat();
	});
</script>

<template>
	<div class="completed-tasks  container">
		<div
			class="completed-tasks__container"
		>
			<p v-if="!tasksStore.completedTasks.length">
				Нет выполненых задач 🙄
			</p>
			<CompletedTask
				v-for="(task, i) in tasksStore.completedTasks"
				:key="task.id"
				:taskId="task.id"
				:projectId="task.project_id"
				:numeration="i + 1"
				:text="task.location"
				:importance="task.importance"
				:task
			/>
		</div>
		<div class="tasks-stat__container">
			<Stat
				:completedTasks="useStatStore().completedTasks"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.container { padding-top: 50px; }

	.completed-tasks
	{
		display: flex;
		column-gap: 200px;
	}

	.completed-tasks__container
	{
		padding: 20px;
		background-color: rgba($gray-color, 0.1);
		width: 350px;
		max-height: 400px;
		border-radius: 10px;
		border: 1px solid $white-color;
		overflow-y: auto;
		scrollbar-width: thin;
	}
</style>
