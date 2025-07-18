<script setup>
	import { useTasksStore } from '~/src/stores/tasksStore';
	const tasksStore = useTasksStore();
</script>

<template>
	<button @click="tasksStore.bulkDelete()">
		<Icon
			path="trash.svg"
			size="small"
		/>
	</button>
</template>
