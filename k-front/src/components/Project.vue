<script setup>
	import { ref, onMounted, provide } from 'vue';
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

	provide('tasks', tasks);

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

	onMounted(() => fetchTasks());
</script>

<template>
	<table
		class="project-table"
		cellspacing="0"
	>
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
				<th>Наличие</th>
				<th>Важность</th>
				<th>Статус</th>
				<th>Комментарий</th>
				<th />
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
			<tr
				class="project-table__last-row"
			>
				<td colspan="7">
					<button
						@click="addTask"
					>
						Добавить задачу
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style lang='scss'>
	.project-table
	{
		width: 100%;
		border-collapse: collapse;

		td
		{
			padding: 5px;

			input, textarea { font-size: 14px; }
		}

		td,
		th,
		tr th { border-color: white; }

		td:first-child { border-left: none; }

		td:last-child
		{
			border-right: none;

			button
			{
				width: 100%;
				color: rgba(white, 0.5);
				transition: .3s ease color;

				&:hover { color: white; }
			}
		}

		tr:nth-last-child(2) td { border-bottom-color: transparent; }
	}

	.project-table__header
	{
		th
		{
			border: 1px solid black;
			border-top: none;
			font-weight: normal;
			font-size: 18px;

			&:last-child { border-right: none; }
		}

		.project-table__numeration-column
		{
			width: 30px;
			padding: 5px;
			border-left: none;
		}
	}

	.project-table__last-row
	{
		td
		{
			height: 40px;
			border: 1px solid black;
			border-bottom: none;
		}
	}
</style>