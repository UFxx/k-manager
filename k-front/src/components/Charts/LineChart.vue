<script setup>
	import { Line } from 'vue-chartjs';
	import { Chart as ChartJS, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

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

	ChartJS.register(Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

	ChartJS.defaults.font.color = 'white';
	ChartJS.defaults.color = 'white';

	ChartJS.defaults.datasets.line = {
		...ChartJS.defaults.datasets.line,
		fill: true,
		tension: 0.3,
		pointHitRadius: 3,
		borderColor: 'white',
		pointBackgroundColor: 'gray',
		pointBorderColor: 'gray',
		pointHoverBackgroundColor: 'black',
		pointHoverBorderColor: 'white',
	};

	const green = 'rgba(123, 255, 0, 0.5)';

	const options = {
		fill                      : true,
		tension                   : 0.3,
		pointHitRadius            : 3,
		backgroundColor           : green,
		borderColor               : green,
		pointBackgroundColor      : green,
		pointBorderColor          : green,
		pointHoverBackgroundColor : 'black',
		pointHoverBorderColor     : 'white',
		color                     : 'white',
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
	<Line
		:id
		:data="chartData"
		:options
	/>
</template>