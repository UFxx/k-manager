<script setup>
	import { ref } from 'vue';
	import LineChart from '@/Charts/LineChart.vue';
	import BarChart from '@/Charts/BarChart.vue';

	defineProps({
		completedTasks: {
			type: Array,
			required: true
		}
	})

	const chartsList = ['Line', 'Bar'];
	const currentChart = ref(chartsList[0]);

	const switchChart = ({ target }) => currentChart.value = target.value;
</script>

<template>
	<section class="completed-tasks__container">
		<LineChart
			v-if="currentChart === chartsList[0]"
			id="completed-tasks__chart"
			:chartData="completedTasks"
		/>
		<BarChart
			v-else-if="currentChart === chartsList[1]"
			id="completed-tasks__chart"
			:chartData="completedTasks"
		/>

		<div class="completed-tasks__switch-chart">
			<label
				v-for="chart in chartsList"
				:key="chart"
				:for="chart"
			>
				<input
					:id="chart"
					type="radio"
					name="chart-switcher"
					:value="chart"
					:checked="chart === currentChart"
					@change="switchChart"
				/>
				{{ chart }}
			</label>
		</div>
	</section>
</template>

<style lang="scss">
	.completed-tasks__container
	{
		width: 100%;
		background-color: rgba($gray-color, 0.1);
		padding: 15px;
		border-radius: 10px;
		grid-area: completed;
	}

	.completed-tasks__switch-chart
	{
		display: flex;
		justify-content: center;
		width: 100%;
		column-gap: 10px;
		margin-top: 10px;

		label	{ user-select: none; }
	}
</style>