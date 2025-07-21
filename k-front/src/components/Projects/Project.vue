<script setup>
	import { ref, computed, onMounted } from 'vue';
	import Task from '@/Projects/Task.vue';

	import { useTasksStore } from '~/src/stores/tasksStore';

	const props = defineProps({
		projectName: {
			type: String,
			required: true
		},
		projectId: {
			type: Number,
			required: true
		},
		projectIdx: {
			type: Number,
			required: true
		}
	})

	const emit = defineEmits(['deleteProject', 'renameProject']);

	// stores
	const tasksStore = useTasksStore();

	// vars
	const newProjectName = ref(props.projectName);
	const canEditProject = ref(false);
	let originalProjectName;

	const displayedTasks = computed(() => tasksStore.filteredTasks.length ? tasksStore.filteredTasks : tasksStore.tasks);

	// funcs
	const addTask = () => tasksStore.addTask(props.projectId, props.projectIdx);

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

	onMounted(() => tasksStore.fetchTasks(props.projectId));
</script>

<template>
	<div class="container">
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
				<span class="project-table__edit">
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
				</span>
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
					name="fade"
					class="project-container"
				>
					<Task
						v-for="(task, i) in displayedTasks[projectIdx]"
						:key="task.id"
						:numeration="i + 1"
						:location="task.location"
						:available="task.available"
						:importance="task.importance"
						:status="task.status"
						:comment="task.comment"
						:projectId="task.project_id"
						:projectIdx
						:taskId="task.id"
						:isSelected="task.isSelected"
						@delete-task="deleteTask"
						@edit-task="editTask"
						@change-task-selection="changeTaskSelection"
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
	.project-table
	{
		position: relative;
		margin-top: 50px;
		border-collapse: collapse;
		min-width: 1000px;
		width: 1440px;
		overflow-x: scroll;

		@media (max-width: $tablet) { margin: 100px 15px 0 10px; }

		th
		{
			border: 1px solid black;
			border-top: none;
			font-weight: normal;
			font-size: 18px;

			&:last-child { border-right: none; }

			@media (max-width: $tablet) { font-size: 16px; }
		}

		td,
		th,
		tr th { border-color: white; }

		td
		{
			padding: 5px;
			height: 100px;

			@media (max-width: $tablet) { height: 70px; }

			input, textarea
			{
				font-size: 14px;
				padding: 0;

				@media (max-width: $tablet) { font-size: 12px; }
			}

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
		position: sticky;
		left: 10px;
		padding-bottom: 20px;
		width: max-content;
		margin: 0 auto;

		@media (max-width: $tablet) {
			margin: 0;
		}

		input
		{
			font-size: 24px;
			text-align: center;
			max-width: 250px;
			border-bottom: 1px solid rgba($gray-color, 0.3);
			padding-bottom: 5px;
			opacity: 0.5;

			@include tr(0.3, opacity);

			&:focus { opacity: 1; }
		}
	}

	.project-table .project-table__edit
	{
		position: absolute;
		left: calc(100% + 10px);
		top: 0;
		display: flex;
		column-gap: 5px;
		height: auto;
	}

	.project-table__header
	{
		th { padding: 0 10px; }

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