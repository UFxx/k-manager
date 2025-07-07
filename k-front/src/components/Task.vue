<script setup>
	import DynamicTaskField from '@/TaskFields/DynamicTaskField.vue';
	import EditTaskField from '@/TaskFields/EditTaskField.vue';
	import { reactive, ref, computed, inject } from 'vue';
	import tasksApi from '~/src/api/tasks';
	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore()

	const tasks = inject('tasks');

	const props = defineProps({
		taskId:{
			type: Number,
			required: true
		},
		numeration: {
			type: Number,
			required: true
		},
		location: {
			type: String,
			required: true
		},
		available: {
			type: String,
			required: true
		},
		importance: {
			type: Number,
			required: true
		},
		status: {
			type: Number,
			required: true
		},
		comment: {
			type: String,
			required: false,
			default: ''
		},
		projectId: {
			type: Number,
			required: true
		},
		isSelected: {
			type: Boolean,
			required: false
		}
	})

	const emit = defineEmits(['changeTaskSelection']);

	const task = reactive({
		location: props.location,
		available: props.available,
		importance: props.importance,
		status: props.status,
		comment: props.comment
	})

	const canEditTask = ref(false);
	const fieldName = ref(null);
	const canSelectTask = ref(false);

	const editTask = async () =>
	{
		const payload = { ...task, taskId: props.taskId }
		const data = await tasksApi.editTask(payload);

		if (data.success)
		{
			const affectedTaskIdx = tasks.value.findIndex(task => task.id === props.taskId);
			tasks.value[affectedTaskIdx] = data.task;
			toastsStore.useToast(data.message, 'info');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	let originalTask = {};
	const toggleCanEditTask = (type) =>
	{
		if (type === 'edit')
		{
			canEditTask.value = false;
			editTask(fieldName.value, task[fieldName.value]);
		}
		else if (type === 'cancel')
		{
			canEditTask.value = false;
			for (let key in originalTask) task[key] = originalTask[key];
		}
		else
		{
			canEditTask.value = true
			originalTask = {...task};
		};
	};

	const changeFieldName = (newFieldName) => fieldName.value = newFieldName;
	const getFieldType = computed(() => (field) =>
	{
		if (field === 'importance') return 'range';
		else if (field === 'status') return 'select';
		else return 'string';
	})

	const showSelectCheckbox = () => canSelectTask.value = true;
	const hideSelectCheckbox = () => canSelectTask.value = false;
</script>

<template>
	<tr
		:class="['project-table__row', { 'project-table__row--selected' : props.isSelected }]"
		@mouseenter="showSelectCheckbox"
		@mouseleave="hideSelectCheckbox"
	>
		<td
			v-if="!canSelectTask"
			class="project-table__first-column"
		>
			{{ props.numeration }}.
		</td>
		<td
			v-if="canSelectTask"
			class="project-table__first-column"
		>
			<input
				type="checkbox"
				:checked="props.isSelected"
				@change="emit('changeTaskSelection', props.taskId)"
			/>
		</td>

		<DynamicTaskField
			v-for="(_, key) in task"
			:key="key"
			v-model="task[key]"
			:fieldName="key"
			:taskId
			:canEditTask
			:type="getFieldType(key)"
			@change-field-name="changeFieldName"
			@confirm-edit="toggleCanEditTask"
		/>

		<edit-task-field
			:taskId
			:canEditTask
			@toggle-can-edit-task="toggleCanEditTask"
		/>
	</tr>
</template>

<style lang='scss'>
	.project-table__row
	{
		text-align: center;

		@include tr(0.2, background-color);

		&--selected { background-color: rgba($black-color, $alpha: 0.1); }

		&:hover { background-color: rgba($gray-color, $alpha: 0.1); }

		td
		{
			border: 1px solid black;

			@include tr(0.2, background-color);

			&:hover { background-color: rgba($gray-color, $alpha: 0.2); }
		}
	}
</style>