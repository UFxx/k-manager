<script setup>
	import PieChart from '@/Charts/PieChart.vue';

	defineProps({
		createdTasks: {
			type: Array,
			required: true
		}
	})
</script>

<template>
	<section class="created-tasks__container">
		<PieChart
			id="created-tasks__chart"
			:chartData="createdTasks"
		/>
	</section>
</template>

<style lang='scss'>
	.created-tasks__container
	{
		background-color: rgba($gray-color, 0.1);
		padding: 15px;
		border-radius: 10px;
		grid-area: created;
	}
</style>