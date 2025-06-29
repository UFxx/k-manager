<script setup>
	import { ref, onMounted } from 'vue';
	import Task from '@/Task.vue';

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
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${props.projectId}`)
			const data = await res.json();

			if (data.success)
				tasks.value = data.tasks;
			else
				console.log("Ошибка от сервера:", data.message || "Неизвестная ошибка");
		}
		catch(err)
		{
			console.log(err);
		}
	}

	const addTask = async () =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/create`,
				{
					method: 'POST',
					body: JSON.stringify({ projectId: props.projectId }),
					headers : {
						'Content-Type': 'application/json'
					}
				}
			)

			const data = await res.json();

			if (data.success)
				tasks.value = data.tasks;
			else
				console.log(data.message || 'Неизвестная ошибка');
		}
		catch(err)
		{
			console.log(err);
		}
	}

	const deleteTask = async (taskId, projectId) =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/delete`,
				{
					method: 'DELETE',
					body : JSON.stringify({ taskId, projectId }),
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			)

			const data = await res.json();

			if (data.success)
				tasks.value = data.tasks;
			else
				console.log(data.message);
		}
		catch(err)
		{
			console.log(err);
		}
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