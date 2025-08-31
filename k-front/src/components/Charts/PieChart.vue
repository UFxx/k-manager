<script setup>
	import { Pie } from 'vue-chartjs';
	import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, ArcElement } from 'chart.js'
	import {onMounted} from 'vue'

	ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, ArcElement);

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

	const green = 'rgba(123, 255, 0, 0.5)';

	const options = {
		backgroundColor  : green,
		borderRadius     : 5,
		responsive: true,
		scales: {
			x: { display: false },
			y: { display: false }
		}
	}

	onMounted(() => console.log(props.chartData))

</script>

<template>
	<Pie
		:id
		:data="chartData"
		:options
	/>
</template>

<style lang='scss'></style>