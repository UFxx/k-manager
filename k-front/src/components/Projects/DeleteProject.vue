<script setup>
	import { useToastsStore } from '~/src/stores/toastsStore';

	const props = defineProps({
		projectName: {
			type: String,
			required: true
		},
		projectId: {
			type: Number,
			required: true
		}
	})

	const emit = defineEmits(['closePopup', 'deleteProject']);

	const toastsStore = useToastsStore();

	const inputValue = defineModel('');

	const deleteProject = () =>
	{
		if (inputValue.value === props.projectName)
			emit('deleteProject')
		else toastsStore.useToast('Не верное имя проекта', 'error');
	};
</script>

<template>
	<div class="delete-project__wr">
		<div class="delete-project__info">
			<p class="delete-project__info-title">
				Введите название проекта, чтобы удалить его
			</p>
			<p class="delete-project__info-project-name">
				{{ projectName }}
			</p>
		</div>
		<div class="delete-project__buttons">
			<input
				v-model="inputValue"
				type="text"
				placeholder="Название проекта"
				@keyup.enter="deleteProject"
			/>
			<button
				class="delete-project__buttons-confirm"
				@click="deleteProject"
			>
				<Icon
					path="check.svg"
					size="small"
				/>
			</button>
			<button
				class="delete-project__buttons-cancel"
				@click="emit('closePopup')"
			>
				<Icon
					path="times.svg"
					size="small"
				/>
			</button>
		</div>
	</div>
</template>

<style lang='scss'>
	.delete-project__info { padding-bottom: 30px; }

	.delete-project__info-title
	{
		padding-bottom: 10px;
		font-size: 16px;
	}

	.delete-project__info-project-name
	{
		font-size: 12px;
		color: rgba($white-color, 0.5);
	}

	.popup-content .delete-project__buttons
	{
		display: flex;
	}

	.popup-content .delete-project__buttons input
	{
		flex-grow: 1;
		margin-right: 10px;
		border: 1px solid #808080;
		border-radius: 5px;
		color: rgba($white-color, 0.5);
		font-size: 12px;
		padding: 7px 10px;

		&, &::placeholder
		{
			@include tr(0.3, color, border-color);
		}

		&:focus,
		&:focus::placeholder
		{
			color: $white-color;
			border-color: $white-color;
		}
	}

	.popup-content .delete-project__buttons button
	{
		padding: 7px;

		@extend %header-button;
	}

	.popup-content .delete-project__buttons-confirm
	{
		background-color: rgba($green-color, 0.1);
		margin-right: 5px;

		&:hover { background-color: rgba($green-color, 0.5) !important; }
	}

	.popup-content .delete-project__buttons-cancel
	{
		background-color: rgba($red-color, 0.1);

		&:hover { background-color: rgba($red-color, 0.5) !important; }
	}
</style>