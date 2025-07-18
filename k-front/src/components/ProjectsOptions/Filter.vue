<script setup>
	import { ref, reactive } from 'vue';

	import { useTasksStore } from '../../stores/tasksStore';
	const tasksStore = useTasksStore();

	// status - 0 - 4
	// importace - 1 - 5
	const filters = reactive([
		{
			name: 'По важности',
			isDropdownOpened: false,
			filterItems:
				[
					{
						filterItemName: 1,
						filterItemCode: 1,
						isSelected: false
					},
					{
						filterItemName: 2,
						filterItemCode: 2,
						isSelected: false
					},
					{
						filterItemName: 3,
						filterItemCode: 3,
						isSelected: false
					},
					{
						filterItemName: 4,
						filterItemCode: 4,
						isSelected: false
					},
					{
						filterItemName: 5,
						filterItemCode: 5,
						isSelected: false
					}
				]
		},
		{
			name: 'По статусу',
			isDropdownOpened: false,
			filterItems:
				[
					{
						filterItemCode: 0,
						filterItemName: 'Сделать',
						isSelected: false
					},
					{
						filterItemCode: 1,
						filterItemName: 'Пауза',
						isSelected: false
					},
					{
						filterItemCode: 2,
						filterItemName: 'В процессе',
						isSelected: false
					},
					{
						filterItemCode: 3,
						filterItemName: 'Готово',
						isSelected: false
					},
					{
						filterItemCode: 4,
						filterItemName: 'АААААА!',
						isSelected: false
					},
				]
		}
	]);

	const filtersOpened = ref(false);
	const filtersDropdownOpened = ref(false);
	const currentFilter = reactive({ filterName: null, filterCode: null, filterItemName: null });

	const openFiltersDropdown = (filterIdx) =>
	{
		if (!filters[filterIdx].isDropdownOpened)
		{
			filters.forEach(filter => filter.isDropdownOpened = false);
			filtersDropdownOpened.value = true;
			filters[filterIdx].isDropdownOpened = true;
		}
		else
		{
			filters[filterIdx].isDropdownOpened = false;
			filtersDropdownOpened.value = false;
		}
	}

	const selectDropdownItem = (item) =>
	{
		currentFilter.filterCode = item.filterItemCode;
		currentFilter.filterItemName = item.filterItemName;
		filters.forEach(filter => filter.filterItems.forEach(filterItem => filterItem.isSelected = false));
		item.isSelected = true;
		tasksStore.filterTasks(currentFilter);
	}

	const clearFilters = () =>
	{
		tasksStore.clearFilters();

		filters.forEach(filter =>
		{
			filter.isDropdownOpened = false;
			filtersDropdownOpened.value = false;
			filter.filterItems.forEach(filterItem => filterItem.isSelected = false)
		});
	}
</script>

<template>
	<button @click="filtersOpened = !filtersOpened">
		<Icon
			path="filter.svg"
			size="small"
		/>
	</button>
	<div :class="['filters-container', filtersDropdownOpened ? 'dropdown--opened' : null]">
		<ul
			v-if="filtersOpened"
			class="filters"
		>
			<li
				v-for="(filter, i) in filters"
				:key="i"
				:class="['filters__item', filter.isDropdownOpened ? 'dropdown--opened' : null]"
				@click="currentFilter.filterName = filter.name"
			>
				<button @click="openFiltersDropdown(i)">
					{{ filter.name }}
					<Icon
						path="right-arrow.svg"
						size="x-small"
					/>
				</button>
				<ul
					v-if="filter.isDropdownOpened"
					class="filters__item-dropdown"
				>
					<li
						v-for="(item, j) in filter.filterItems"
						:key="j"
						class="filters__item-dropdown-item"
						@click="selectDropdownItem(item)"
					>
						<button>
							{{ item.filterItemName }}
							<Icon
								v-if="item.isSelected"
								path="check.svg"
								size="x-small"
							/>
						</button>
					</li>
				</ul>
			</li>
			<button
				class="filters__clear-filter"
				@click="clearFilters()"
			>
				Очистить
			</button>
		</ul>
	</div>
</template>

<style lang='scss' scoped>
	.filters-container
	{
		position: absolute;
		top: 100%;
		background-color: rgba($gray-color, 0.1);
		backdrop-filter: blur(8px);
		padding: 5px;
		border-radius: 8px;

		@include tr(0.3, border-radius);

		button
		{
			white-space: nowrap;
			&:hover { transform: translate(0); }
		}

		li { list-style: none; }
	}

	.filters-container.dropdown--opened { border-radius: 8px 0 0 8px; }

	.filters__item
	{
		button
		{
			display: flex;
			align-items: center;
			column-gap: 5px;

			img { @include tr(0.3, transform) }

			&:hover
			{
				img { transform: translateX(2px); }
			}
		}

		&.dropdown--opened
		{
			button img { transform: rotate(180deg); }
		}
	}

	.filters__item-dropdown
	{
		position: absolute;
		top: 0;
		left: 100%;
		backdrop-filter: blur(8px);
		border-radius: 0 8px 8px 8px;
		border-left: 1px solid rgba($white-color, 0.3);
		padding: 5px;
		background-color: rgba($gray-color, 0.1);
		width: 100%;
	}

	.filters__item-dropdown .filters__item-dropdown-item
	{
		button img { transform: rotate(0); }
	}

	.filters__clear-filter
	{
		text-align: center;
		width: 100%;
		margin-top: 10px;
		background-color: rgba($gray-color, 0.5);

		&:hover { background-color: rgba($gray-color, 0.7); }
	}

</style>
