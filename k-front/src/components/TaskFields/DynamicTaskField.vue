<script setup>
	import StringTaskField from '@/TaskFields/StringTaskField.vue';
	import RangeTaskField from '@/TaskFields/RangeTaskField.vue';
	import SelectTaskField from '@/TaskFields/SelectTaskField.vue';

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
		},
		type: {
			type: String,
			required: true
		}
	})

	const model = defineModel();
	const emit = defineEmits(['update:modelValue', 'changeFieldName', 'confirmEdit']);

	const changeInputValue = (value) =>
	{
		emit('update:modelValue', value);
		emit('changeFieldName', props.fieldName);
	}

	const confirmEdit = (e) => e === 'Enter' ? emit('confirmEdit', 'edit') : null;
</script>

<template>
	<string-task-field
		v-if="props.type === 'string'"
		v-model="model"
		:fieldName="props.fieldName"
		:canEditTask="props.canEditTask"
		@confirm-edit="confirmEdit"
		@change-input-value="changeInputValue"
	/>
	<range-task-field
		v-if="props.type === 'range'"
		v-model="model"
		:fieldName="props.fieldName"
		:canEditTask="props.canEditTask"
		@confirm-edit="confirmEdit"
		@change-input-value="changeInputValue"
	/>
	<select-task-field
		v-if="props.type === 'select'"
		v-model="model"
		@change-input-value="changeInputValue"
		@confirm-edit="emit('confirmEdit', 'edit')"
	/>
</template>