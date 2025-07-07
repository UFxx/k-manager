<script setup>
	import Toast from '@/Toast.vue';
	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore();
</script>

<template>
	<div class="toasts-container">
		<TransitionGroup name="toast-fade">
			<Toast
				v-for="toast in toastsStore.toasts"
				:id="toast.id"
				:key="toast.id"
				:message="toast.message"
				:type="toast.type"
			/>
		</TransitionGroup>
	</div>
</template>

<style lang="scss" scoped>
	.toasts-container
	{
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		row-gap: 10px;
		top: 10px;
		right: 30px;
		z-index: 3;
	}

	@keyframes slide-up {
	from
	{
		transform: translateX(100px);
		opacity: 0;
	}

	to
	{
		transform: translateY(0);
		opacity: 1;
	}
}

@keyframes slide-down {
	from
	{
		transform: translateY(0);
		opacity: 1;
	}

	to
	{
		transform: translateX(100px);
		opacity: 0;
	}
}

.toast-fade-enter-active { animation: slide-up 0.3s ease; }

.toast-fade-leave-active { animation: slide-down 0.3s ease; }
</style>