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

</script>

<template>
	<td>
		<textarea
			v-model="model"
			type="text"
			:disabled="!props.canEditTask"
			@input="emit('changeInputValue', $event.target.value)"
			@keydown="emit('confirmEdit', $event.key)"
		/>
	</td>
</template>

<style lang="scss" scoped>
	input
	{
		width: 100%;
		height: 100%;
		padding: 5px;
		padding-right: 0;
		border: none;
		font-size: 14px;

		&:disabled { color: black; }
	}
</style>