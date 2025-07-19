<script setup>
	import BulkDelete from '@/ProjectsOptions/BulkDelete.vue';
	import Filter from '@/ProjectsOptions/Filter.vue';
	import Search from '@/ProjectsOptions/Search.vue';

	import { useTasksStore } from '~/src/stores/tasksStore';

	const tasksStore = useTasksStore();

</script>

<template>
	<div class="projects-options__container">
		<div class="projects-options__buttons">
			<Filter />
			<BulkDelete />
			<Search />
		</div>
		<div class="projects-options__info">
			<p v-if="tasksStore.selectedTasks.length">
				Выбрано {{ tasksStore.selectedTasks.length }}
			</p>
			<p v-if="tasksStore.currentFilter">
				Фильтр: {{ tasksStore.currentFilter.filterName }} - {{ tasksStore.currentFilter.filterValue }}
			</p>
		</div>
	</div>
</template>

<style lang='scss'>
.projects-options__container
	{
		display: flex;
		align-items: center;
		position: absolute;
		top: -20px;
		column-gap: 5px;
		z-index: 1;
	}

	.projects-options__buttons
	{
		display: flex;
		align-items: center;
		column-gap: 5px;

		button { @extend %header-button; }
	}

	.projects-options__info { opacity: 0.5; }
</style>