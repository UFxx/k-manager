<script setup>
	import { ref, onMounted, provide } from 'vue';
	import Task from '@/Task.vue';

	import tasksApi from '~/src/api/tasks'
	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore()

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
	const canEditProject = ref(false);

	provide('tasks', tasks);

	const fetchTasks = async () =>
	{
		const data = await tasksApi.fetchTasks(props.projectId);

		if (data.success) tasks.value = data.tasks;
		else toastsStore.useToast(data.message, 'error');
	}

	const addTask = async () =>
	{
		const payload = { projectId: props.projectId }
		const data = await tasksApi.addTask(payload);

		if (data.success)
		{
			tasks.value.push(data.task);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	let originalProjectName;
	const renameProject = (type) =>
	{
		if (type === 'rename')
		{
			canEditProject.value = false;
			emit('renameProject', props.projectId, newProjectName.value)
		}
		else if (type === 'cancel')
		{
			canEditProject.value = false;
			newProjectName.value = originalProjectName;
		}
		else
		{
			canEditProject.value = true
			originalProjectName = props.projectName;
		}
	}

	onMounted(() => fetchTasks());
</script>

<template>
	<div class="container">
		<div class="project-table__edit">
			<template v-if="canEditProject">
				<button @click="renameProject('rename')">
					<Icon
						path="check.svg"
						size="small"
					/>
				</button>
				<button @click="renameProject('cancel')">
					<Icon
						path="times.svg"
						size="small"
					/>
				</button>
				<button @click="emit('deleteProject', props.projectId)">
					<Icon
						path="trash.svg"
						size="small"
					/>
				</button>
			</template>
			<button
				v-else
				@click="renameProject()"
			>
				<Icon
					path="edit.svg"
					size="small"
				/>
			</button>
		</div>
		<table
			class="project-table"
			cellspacing="0"
		>
			<caption>
				<input
					v-model="newProjectName"
					type="text"
					placeholder="Название проекта"
					:disabled="!canEditProject"
				/>
			</caption>
			<tbody>
				<tr class="project-table__header">
					<th class="project-table__numeration-column">
						№
					</th>
					<th class="project-table__location-column">
						Расположение
					</th>
					<th class="project-table__available-column">
						Наличие
					</th>
					<th class="project-table__importance-column">
						Важность
					</th>
					<th class="project-table__status-column">
						Статус
					</th>
					<th class="project-table__comment-column">
						Комментарий
					</th>
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
	</div>
</template>

<style lang='scss'>
	.container { position: relative; }

	.project-table
	{
		margin-top: 50px;
		width: 100%;
		border-collapse: collapse;

		th
		{
			border: 1px solid black;
			border-top: none;
			font-weight: normal;
			font-size: 18px;

			&:last-child { border-right: none; }
		}

		td,
		th,
		tr th { border-color: white; }

		td
		{
			padding: 5px;

			input, textarea { font-size: 14px; }
			&:first-child { border-left: none; }

			&:last-child
			{
				border-right: none;

				button { width: auto; }
			}
		}

		tr:nth-last-child(2) td { border-bottom-color: transparent; }

		&__location-column { width: 20%; }
		&__available-column { width: 20%; }
		&__importance-column { width: 15%; }
		&__status-column { width: 15%; }
		&__comment-column { width: 20%; }
	}

	.project-table caption
	{
		padding-bottom: 20px;

		input
		{
			font-size: 24px;
			text-align: center;
		}
	}

	.project-table__edit
	{
		position: absolute;
		top: 15px;
		left: 62%;
		display: flex;
		column-gap: 5px;
		transform: translate(-50%, -50%);
	}

	.project-table__header
	{
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
			text-align: center;

			@include tr(0.3, background-color);

			&:hover { background-color: rgba($gray-color, 0.3); }
		}
	}

	.project-table .project-table__last-row td
	{
		button
			{
				height: 100%;
				width: 100%;
			}
	}
</style>