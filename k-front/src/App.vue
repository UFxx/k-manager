<script setup>
	import { ref, onMounted } from 'vue';
	import Project from '@/Project.vue';
	import Toaster from '@/Toaster.vue';

	import projectsApi from '~/src/api/projects'

	import { useToastsStore } from './stores/toastsStore';
	const toastsStore = useToastsStore();

	const projects = ref([]);
	const newCreatedProjectName = ref(null);

	const fetchProjects = async () =>
	{
		const data = await projectsApi.fetchProjects();

		if (data.success) projects.value = data.projects;
		else toastsStore.useToast(data.message, 'error');
	}

	const createNewProject = async () =>
	{
		const payload = { projectName: newCreatedProjectName.value };
		const data = await projectsApi.createNewProject(payload);

		if (data.success)
		{
			projects.value.push(data.project);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	const deleteProject = async (projectId) =>
	{
		const data = await projectsApi.deleteProject(projectId)

		if (data.success)
		{
			projects.value = projects.value.filter((project) => project.project_id !== projectId);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
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
	<Toaster />
	<div class="container">
		<main>
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
		</main>
	</div>
</template>

<style lang="scss">
	.projects-container { overflow: hidden; }

	.project-fade-enter-active,
	.project-fade-leave-active {
		max-height: 200px;
		opacity: 1;

		@include tr(0.3, opacity, transform);
	}

	.project-fade-enter-from,
	.project-fade-leave-to {
		opacity: 0;
		transform: translateY(-10px);
		max-height: 0;
	}

	.project-fade-move { @include tr(0.5, transform); }
</style>
