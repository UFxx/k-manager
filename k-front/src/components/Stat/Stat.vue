<script setup>
	import CompletedTasksStat from '@/Stat/CompletedTasksStat.vue';
	import CreatedTasksStat from '@/Stat/CreatedTasksStat.vue';

	defineProps({
		createdTasks: {
			type: Array,
			required: true
		},
		completedTasks: {
			type: Array,
			required: true
		}
	})

</script>

<template>
	<section class="tasks-stat">
		<CreatedTasksStat :createdTasks />
		<CompletedTasksStat :completedTasks />
	</section>
</template>

<style lang='scss'>
	.tasks-stat
	{
		display: grid;
		grid-template-areas: 'created .'
												'completed completed';
		row-gap: 20px;
		width: 600px;
	}
</style>