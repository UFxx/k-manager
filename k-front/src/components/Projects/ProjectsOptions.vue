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
		<div
			v-if="tasksStore.selectedTasks.length || tasksStore.currentFilter"
			class="projects-options__info"
		>
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
		position: sticky;
		top: 73px;
		display: flex;
		flex-direction: column;
		align-items: center;
		column-gap: 5px;
		padding: 10px;
		background-color: rgba($black-color, 0.1);
		backdrop-filter: blur(8px);
		width: max-content;
		border-radius: 0 0 15px 15px;
		z-index: 3;

		@extend %box-shadow;

		@media (max-width: $tablet)
		{
			position: fixed;
			top: 73px;
		}
	}

	.projects-options__buttons
	{
		display: flex;
		align-items: center;
		column-gap: 5px;

		button { @extend %header-button; }

		input
		{
			@media (max-width: $mobile) {
				width: 210px;
				font-size: 12px;
			}
		}
	}

	.projects-options__info
	{
		opacity: 0.5;
		align-self: flex-start;
		margin-top: 10px;
	}
</style>