<script setup>
	import { ref, watchEffect } from 'vue';

	const isOpen = ref(false);

	watchEffect(() =>
	{
		const padding = window.outerWidth - window.innerWidth;

		if (isOpen.value)
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
			v-if="isOpen"
			class="popup-background"
			@click="isOpen = false"
		/>
		<div
			v-if="isOpen"
			class="popup-content"
		>
			<div class="popup__close">
				<Icon
					path="/times.svg"
					size="small"
					@click="isOpen = false"
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
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: max-content;
		height: max-content;
		padding: 20px;
		border-radius: 30px;
		background-color: rgba($gray-color, 0.5);
		z-index: 4;
	}

	.popup__close
	{
		position: absolute;
		top: 30px;
		right: 30px;
		opacity: 0.5;
		cursor: pointer;

		@include tr(0.3, opacity);

		&:hover { opacity: 1; }
	}
</style>