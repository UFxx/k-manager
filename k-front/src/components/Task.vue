<script setup>
	import TaskField from '@/TaskField.vue';
	import { ref } from 'vue';

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

	const emit = defineEmits(['deleteTask', 'editTask']);

	const inputValue = ref(null);

</script>
<!-- Значения в инпуте нет, потому что не доделал двухстороннее связывание -->
<template>
	<tr class="project-table__row">
		<td>{{ props.numeration }}.</td>
		<!-- <td>
			<input
				v-model="locationInputValue"
				type="text"
				@input="emit('editTask', taskId, projectId, 'location', locationInputValue)"
			/>
		</td> -->
		<task-field
			v-model="inputValue"
			:value="props.location"
			:fieldName="`location`"
			:taskId="taskId"
			:projectId="projectId"
		/>
		<td>{{ props.available }}</td>
		<td>{{ props.importance }}</td>
		<td>{{ props.status }}</td>
		<td>{{ props.comment }}</td>
		<td>
			<button @click="emit('deleteTask', props.taskId, props.projectId)">
				Удалить задачу
			</button>
		</td>
	</tr>
</template>

<style lang='scss'>
	.project-table__row
	{
		text-align: center;

		td
		{
			border: 1px solid black;

			input
			{
				width: 100%;
				height: 100%;
				padding: 5px;
				padding-right: 0;
				border: none;
				font-size: 14px;
			}
		}
	}
</style>