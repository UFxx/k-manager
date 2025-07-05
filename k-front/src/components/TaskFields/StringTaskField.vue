<script setup>
	const props = defineProps({
		fieldName: {
			type: String,
			required: true
		},
		taskId: {
			type: Number,
			required: true
		},
		canEditTask: {
			type: Boolean,
			required: true
		}
	})

	const model = defineModel();
	const emit = defineEmits(['update:modelValue', 'changeFieldName']);

	const changeInputValue = (value) =>
	{
		emit('update:modelValue', value);
		emit('changeFieldName', props.fieldName);
	}
</script>

<template>
	<td>
		<input
			v-model="model"
			type="text"
			:disabled="!props.canEditTask"
			@input="changeInputValue($event.target.value)"
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

		&:disabled
		{
			color: black;
			cursor: no-drop;
		}
	}
</style>