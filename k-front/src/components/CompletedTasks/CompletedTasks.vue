<script setup>
	import { onMounted } from 'vue';

	import { useTasksStore } from '~/src/stores/tasksStore';
	const tasksStore = useTasksStore();

	onMounted(() => tasksStore.fetchCompletedTasks());
</script>

<template>
	<div class="container" />
</template>
