<script setup>
	import { ref, onMounted } from 'vue';
	import Task from '@/Task.vue';

	import tasksApi from '~/src/api/tasks'

	const props = defineProps({
		projectName: {
			type: String,
			required: true
		},
		projectId: {
			type: Number,
			required: true
		}
	})

	const emit = defineEmits(['deleteProject', 'renameProject']);

	const tasks = ref([]);
	const newProjectName = ref(props.projectName);

	const fetchTasks = async () =>
	{
		const data = await tasksApi.fetchTasks(props.projectId);

		if (data.success) tasks.value = data.tasks;
		else console.log(data.message || "Неизвестная ошибка");
	}

	const addTask = async () =>
	{
		const payload = { projectId: props.projectId }
		const data = await tasksApi.addTask(payload);

		if (data.success)
		{
			tasks.value.push(data.task);
			console.log(data.message);
		}
		else console.log(data.message || 'Неизвестная ошибка');
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

	let editTaskDebouncerTimeout;

	const editTask = async (fieldName, newValue, taskId) =>
	{
		if (editTaskDebouncerTimeout) clearTimeout(editTaskDebouncerTimeout)

		editTaskDebouncerTimeout = setTimeout(async () =>
		{
			const payload = { fieldName, newValue, taskId }
			const data = await tasksApi.editTask(payload);

			if (data.success)
			{
				const affectedTaskIdx = tasks.value.findIndex(task => task.id === taskId);
				tasks.value[affectedTaskIdx] = data.task;
				console.log(data.message);
			}
			else console.log(data.message);
		}, 2000)
	}

	onMounted(() => fetchTasks());
</script>

<template>
	<table class="project-table">
		<caption>
			<button @click="emit('renameProject', props.projectId, newProjectName)">
				Переименовать
			</button>
			<input
				v-model="newProjectName"
				type="text"
				placeholder="Переименовать проект"
			/>
			<button @click="emit('deleteProject', props.projectId)">
				Удалить проект
			</button>
		</caption>
		<tbody>
			<tr class="project-table__header">
				<th class="project-table__numeration-column">
					№
				</th>
				<th>Расположение</th>
				<th>Отсутствие</th>
				<th>Важность</th>
				<th>Сделано</th>
				<th>Комментарий</th>
			</tr>
			<TransitionGroup
				name="project-fade"
				class="project-container"
			>
				<Task
					v-for="(task, i) in tasks"
					:key="task.id"
					:numeration="i + 1"
					:location="task.location"
					:available="task.available"
					:importance="task.importance"
					:status="task.status"
					:comment="task.comment"
					:projectId="task.project_id"
					:taskId="task.id"
					@delete-task="deleteTask"
					@edit-task="editTask"
				/>
			</TransitionGroup>
			<tr class="project-table__last-row">
				<td />
				<td>
					<button
						@click="addTask"
					>
						Добавить задачу
					</button>
				</td>
				<td />
				<td />
				<td />
				<td />
			</tr>
		</tbody>
	</table>
</template>

<style lang='scss'>
	.project-table { width: 100%; }

	.project-table__last-row
	{
		td
		{
			height: 40px;
			border: 1px solid black;
		}
	}

	.project-table__header
	{
		th
		{
			width: 20%;
			border: 1px solid black;
			border-radius: 4px;
		}

		.project-table__numeration-column
		{
			width: 30px;
			padding: 5px;
		}
	}

</style>