<script setup>
	import { Pie } from 'vue-chartjs';
	import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'

	ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale);

	const props = defineProps({
		id: {
			type: String,
			required: false,
			default: ''
		},
		chartData: {
			type: Object,
			required: true
		}
	})

	console.log(props.chartData);


	const green = 'rgba(123, 255, 0, 0.5)';

	const options = {
		backgroundColor  : green,
		borderColor      : green,
		borderRadius     : 5,
		responsive: true,
		scales: {
			x: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)'
				}
			},
			y: {
				grid: {
					color: 'rgba(255, 255, 255, 0.1)'
				}
			}
		}
	}

</script>

<template>
	<Pie
		:id
		:data="chartData"
		:options
	/>
</template>

<style lang='scss'></style>