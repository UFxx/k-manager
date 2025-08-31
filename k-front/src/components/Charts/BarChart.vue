<script setup>
	import { Bar } from 'vue-chartjs';
	import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

	defineProps({
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

	ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
	<Bar
		:id
		:data="chartData"
		:options
	/>
</template>