<script setup>
	import { ref, onMounted } from 'vue';
	import Project from '@/Project.vue';

	import projectsApi from '~/src/api/projects'

	const projects = ref([]);
	const newCreatedProjectName = ref(null);

	const fetchProjects = async () =>
	{
		const data = await projectsApi.fetchProjects();

		if (data.success) projects.value = data.projects;
		else console.log(data.message || "Неизвестная ошибка");
	}

	const createNewProject = async () =>
	{
		const payload = { projectName: newCreatedProjectName.value };
		const data = await projectsApi.createNewProject(payload);

		if (data.success)
		{
			projects.value.push(data.project);
			console.log(data.message);
		}
		else console.log(data.message || "Неизвестная ошибка");
	}

	const deleteProject = async (projectId) =>
	{
		const data = await projectsApi.deleteProject(projectId)

		if (data.success)
		{
			projects.value = projects.value.filter((project) => project.project_id !== projectId);
			console.log(data.message);
		}
		else console.log(data.message || 'Неизвестная ошибка');
	}

	const renameProject = async (projectId, newProjectName) =>
	{
		const payload = { projectId, projectName: newProjectName }
		const data = await projectsApi.renameProject(payload);

		if (data.success)
		{
			projects.value
				.find(project => project.project_id === data.project.project_id)
				.project_name = data.project.project_name;

			console.log(data.message);
		}
		else console.log(data.message || 'Неизвестная ошибка');
	}

	onMounted(async () => await fetchProjects());
</script>

<template>
	<TransitionGroup
		name="project-fade"
		tag="div"
		class="project-container"
	>
		<Project
			v-for="project in projects"
			:key="project.project_id"
			:projectName="project.project_name"
			:projectId="project.project_id"
			@delete-project="deleteProject"
			@rename-project="renameProject"
		/>
	</TransitionGroup>
	<input
		v-model="newCreatedProjectName"
		type="text"
		placeholder="Имя проекта"
	/>
	<button @click="createNewProject">
		Добавить проект
	</button>
</template>

<style>
	.projects-container { overflow: hidden; }

	.project-fade-enter-active,
	.project-fade-leave-active {
		transition: all 0.5s ease;
		max-height: 200px;
		opacity: 1;
	}

	.project-fade-enter-from,
	.project-fade-leave-to {
		opacity: 0;
		transform: translateY(-10px);
		max-height: 0;
	}

	.project-fade-move { transition: transform 0.3s ease; }
</style>
