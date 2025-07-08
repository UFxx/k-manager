<script setup>
	import { ref, onMounted, provide } from 'vue';
	import Project from '@/Project.vue';
	import Toaster from '@/Toaster.vue';
	import Header from '@/Header.vue';

	import projectsApi from '~/src/api/projects'

	import { useToastsStore } from '~/src/stores/toastsStore';
	const toastsStore = useToastsStore();

	const projects = ref([]);

	provide('projects', projects);

	const fetchProjects = async () =>
	{

		const data = await projectsApi.fetchProjects();

		if (data.success) projects.value = data.projects;
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
			toastsStore.useToast(data.message, 'info');
		}
		else toastsStore.useToast(data.message, 'error');
	}

	onMounted(async () => await fetchProjects());
</script>

<template>
	<Toaster />
	<Header />
	<div class="container">
		<main>
			<TransitionGroup
				name="project-fade"
				tag="div"
				class="project-container"
			>
				<Project
					v-for="(project, i) in projects"
					:key="project.project_id"
					:projectName="project.project_name"
					:projectId="project.project_id"
					:projectIdx="i"
					@delete-project="deleteProject"
					@rename-project="renameProject"
				/>
			</TransitionGroup>
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
