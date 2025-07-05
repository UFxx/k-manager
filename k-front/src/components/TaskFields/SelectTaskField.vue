<script setup>
	import { ref, computed } from 'vue'

	const props = defineProps({
		fieldName: {
			type: String,
			required: true
		},
		canEditTask: {
			type: Boolean,
			required: true
		}
	})

	const model = defineModel();
	const emit = defineEmits(['changeInputValue']);

	const isDropdownOpened = ref(false);

	const statuses = ref([
		{
			name: 'Сделать',
			color: '#FFC300',
			statusCode: 0
		},
		{
			name: 'Пауза',
			color: '#585E69',
			statusCode: 1
		},
		{
			name: 'В процессе',
			color: '#007BFF',
			statusCode: 2,
		},
		{
			name: 'Готово',
			color: '#00FF09',
			statusCode: 3
		},
		{
			name: 'AAAAAA!',
			color: 'red',
			statusCode: 4
		}
	]);

	const unselectedStatuses = computed(() => statuses.value.filter((_, i) => i !== model.value))

	const changeSelectValue = (status) =>
	{
		emit('changeInputValue', status.statusCode);
		isDropdownOpened.value = false;
	}
</script>

<template>
	<td>
		<div :class="['container', !props.canEditTask ? 'disabled' : null]">
			<button
				:style="{backgroundColor: statuses[model].color}"
				@click="isDropdownOpened = !isDropdownOpened"
			>
				{{ statuses[model].name }}
			</button>

			<Transition
				name="dropdown"
				enterActiveClass="dropdown-enter-active"
				leaveActiveClass="dropdown-leave-active"
				enterFromClass="dropdown-enter-from"
				leaveToClass="dropdown-leave-to"
			>
				<div
					v-if="isDropdownOpened && props.canEditTask"
					class="dropdown"
				>
					<ul>
						<li
							v-for="(status, i) in unselectedStatuses"
							:key="i"
							@click="changeSelectValue(status)"
						>
							<button :style="{backgroundColor: status.color}">
								{{ status.name }}
							</button>
						</li>
					</ul>
				</div>
			</Transition>
		</div>
	</td>
</template>

<style lang='scss' scoped>
	.container
	{
		position: relative;
		padding: 5px;

		button
		{
			width: 100%;
			padding: 10px;
			font-size: 14px;
			border-radius: 8px;
			transition: .3s ease box-shadow, .3s ease transform;
			color: white;
		}

		&.disabled {
			button { cursor: default; }
		}
	}


	.dropdown
	{
		position: absolute;
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
		padding: 5px;
		background-color: rgba(#AAAAAA, 0.1);
		border-radius: 8px;
		box-shadow: 0 4px 4px 0 rgba(#000000, 0.25);
		backdrop-filter: blur(4px);

		button
		{
			width: 100%;
			padding: 10px;
			font-size: 14px;
			border-radius: 8px;
			transition: .3s ease box-shadow, .3s ease transform;

			&:hover
			{
				box-shadow: 0 4px 4px 0 rgba(#000000, 0.25);
				transform: translateY(-4px);
			}
		}

		ul {
			width: 100%;

			li {
				list-style: none;
				width: 100%;
				margin-top: 8px;

				&:first-child { margin-top: 0; }
			}
		}
	}

	.dropdown-enter-active,
	.dropdown-leave-active {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
		transition: all 0.3s ease;
	}

	.dropdown-enter-from,
	.dropdown-leave-to {
			opacity: 0;
			transform: translateX(-50%) translateY(-4px);
	}
</style>