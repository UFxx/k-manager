<script setup>
	import StringTaskField from '@/TaskFields/StringTaskField.vue';
	import EditTaskField from '@/TaskFields/EditTaskField.vue';
	import { reactive, ref, inject } from 'vue';
	import tasksApi from '~/src/api/tasks';

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
		}
	})

	const editTask = async () =>
	{
		const payload = { ...task, taskId: props.taskId }
		const data = await tasksApi.editTask(payload);

		if (data.success)
		{
			const affectedTaskIdx = tasks.value.findIndex(task => task.id === props.taskId);
			tasks.value[affectedTaskIdx] = data.task;
			console.log(data.message);
		}
		else console.log(data.message);
	}

	const deleteTask = async (taskId) =>
	{
		const data = await tasksApi.deleteTask(taskId);

		if (data.success)
		{
			tasks.value = tasks.value.filter(task => task.id !== taskId);
			console.log(data.message);
		}
		else console.log(data.message);
	}

	const task = reactive({
		location: props.location,
		available: props.available,
		importance: props.importance,
		status: props.status,
		comment: props. comment
	})

	const canEditTask = ref(false);
	const fieldName = ref(null);

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
			for (let key in originalTask)
			{
				task[key] = originalTask[key];
			}
		}
		else
		{
			canEditTask.value = true
			originalTask = {...task};
		};
	};

	const changeFieldName = (newFieldName) => fieldName.value = newFieldName;
</script>

<template>
	<tr class="project-table__row">
		<td class="project-table__first-column">
			{{ props.numeration }}.
		</td>
		<string-task-field
			v-for="(t, i) in task"
			:key="i"
			v-model="task[i]"
			:fieldName="i"
			:taskId
			:canEditTask
			@change-field-name="changeFieldName"
		/>
		<EditTaskField
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

		&:hover { background-color: rgba(black, $alpha: 0.3); }

		td { border: 1px solid black; }
	}
</style>