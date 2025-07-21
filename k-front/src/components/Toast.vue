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

		@extend %box-shadow;
		@include tr(0.3, opacity, transform);

		&:hover
		{
			opacity: 0.7;
			transform: translateY(4px);
			box-shadow: none;
		}

		p { user-select: none; }

		&.success { background-color: #2bbd2b; }
		&.error { background-color: red; }
		&.info { background-color: #ffc300; }
	}
</style>