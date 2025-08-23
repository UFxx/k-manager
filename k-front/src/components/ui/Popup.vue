<script setup>
	import { watchEffect } from 'vue';

	const props = defineProps({
		isOpened: {
			type: Boolean,
			requred: true,
		}
	})

	const emit = defineEmits(['closePopup']);

	watchEffect(() =>
	{
		const padding = window.outerWidth - window.innerWidth;

		if (props.isOpened)
		{
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = padding + 'px';
		}
		else
		{
			document.body.style.overflow = 'auto';
			document.body.style.paddingRight = 0;
		}
	})
</script>

<template>
	<TransitionGroup name="fade">
		<div
			v-if="isOpened"
			class="popup-background"
			@click="emit('closePopup')"
		/>
		<div
			v-if="isOpened"
			class="popup-content"
		>
			<div
				class="popup__close"
				@click="emit('closePopup')"
			>
				<Icon
					path="/times.svg"
					size="small"
				/>
			</div>
			<slot />
		</div>
	</TransitionGroup>
</template>

<style lang='scss'>
	.popup-background
	{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($black-color, 0.3);
		backdrop-filter: blur(8px);
		z-index: 3;
		cursor: not-allowed;
	}

	.popup-content
	{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: max-content;
		height: max-content;
		padding: 20px;
		border-radius: 15px;
		background-color: #585E69;
		z-index: 4;
	}

	.popup__close
	{
		position: absolute;
		top: 0;
		right: -60px;
		opacity: 0.5;
		cursor: pointer;
		background-color: rgba($gray-color, 0.1);

		@extend %header-button;

		&:hover { opacity: 1; }
	}
</style>