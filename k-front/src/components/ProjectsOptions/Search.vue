<script setup>
	import { ref } from 'vue';

	import { useTasksStore } from '~/src/stores/tasksStore';

	const searchValue = ref(null);
</script>

<template>
	<input
		v-model="searchValue"
		type="search"
		placeholder="Поиск по расположению"
		@input="useTasksStore().searchTasks(searchValue)"
	/>
</template>

<style lang='scss' scoped>
	input
	{
		border: 2px solid rgba($white-color, 0.5);
		font-size: 14px;
		padding: 10px;
		border-radius: 8px;
		background-color: rgba($gray-color, 0.2);
		backdrop-filter: blur(8px);

		@include tr(0.3, border-color, background-color);

		&:focus
		{
			border: 2px solid rgba($white-color, 1);
			background-color: transparent;

			@extend %box-shadow;
		}
	}
</style>