<script setup>
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
	const emit = defineEmits(['confirmEdit', 'changeInputValue']);

	const colors = ['#7BFF00', '#FFFB00', '#FFC300', '#FF0073', '#FF0004'];
</script>

<template>
	<td>
		<div class="container">
			<div :style="{ width: `${model * 20}%`, backgroundColor: colors[model - 1], height: 100 + '%' }" />
		</div>
		<input
			v-model="model"
			type="range"
			min="1"
			max="5"
			:disabled="!props.canEditTask"
			@change="emit('changeInputValue', $event.target.value)"
			@keydown="emit('confirmEdit', $event.key)"
		/>
	</td>
</template>

<style lang='scss' scoped>
	td
	{
		position: relative;
		padding: 5px;
	}

	.container
	{
		border: 2px solid white;
		border-radius: 30px;
		padding: 10px;
		width: calc(100% - 10px);
		height: 20px;
		margin-left: 5px;
		z-index: 1;

			div
			{
				position: absolute;
				border-radius: 30px;
				top: 50%;
				height: 30px;
				transform: translateY(-51%);
				left: 0;

				@include tr(0.3, width, background-color);
			}
	}

	input
	{
		position: relative;
		opacity: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		z-index: 2;

		&:disabled { cursor: default; }
	}
</style>