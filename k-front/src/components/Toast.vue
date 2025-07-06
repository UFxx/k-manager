<script setup>
	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore();

	const props = defineProps({
		id: {
			type: Number,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	})

	const getToastIconBasedOnType = ((type) =>
	{
		switch (type)
		{
			case 'success':
				return 'check.svg';
			case 'error':
				return 'times.svg';
			case 'info':
				return 'info.svg';
			default:
				return 'check.svg';
		}
	})
</script>

<template>
	<div
		:class="['toast', props.type]"
		@click="toastsStore.deleteToast(props.id)"
	>
		<Icon
			:path="getToastIconBasedOnType(props.type)"
			size="small"
		/>
		<p>{{ props.message }}</p>
	</div>
</template>

<style lang='scss' scoped>
	.toast
	{
		position: relative;
		font-size: 16px;
		border-radius: 8px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 10px;
		cursor: pointer;
		box-shadow: 0 4px 4px 0 rgba($black-color, 0.25);

		@include tr(0.3, opacity, transform);

		&:hover
		{
			opacity: 0.7;
			transform: translateY(4px);
			box-shadow: none;

			// &::before { opacity: 1; }
		}

		// &::before
		// {
		// 	position: absolute;
		// 	content: '';
		// 	left: 0;
		// 	top: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	border-radius: 8px;
		// 	opacity: 0;
		// 	background-image: url('../../public/icons/times.svg');

		// 	@include tr(0.3, opacity);
		// }

		&.success { background-color: #2bbd2b; }
		&.error { background-color: red; }
	}
</style>