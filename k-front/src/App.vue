<script setup>
	import { ref, onMounted } from 'vue';
	import Project from '@/Project.vue';

	const projects = ref([]);
	const newCreatedProjectName = ref(null);

	const fetchProjects = async () =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
			const data = await res.json();

			if (data.success)
				projects.value = data.projects;
			else
				console.log(data.message || "Неизвестная ошибка");
		}
		catch(err)
		{
			console.log(err);
		}
	}

	const createNewProject = async () =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/create`,
				{
					method: 'POST',
					body: JSON.stringify({ projectName: newCreatedProjectName.value }),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)

			const data = await res.json();

			if (data.success)
			{
				projects.value = data.projects;
			}

			else
				console.log("Ошибка от сервера:", data.message || "Неизвестная ошибка");
		}
		catch(err)
		{
			console.log(err);
		}
	}

	const deleteProject = async (projectId) =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/delete`,
				{
					method: 'DELETE',
					body : JSON.stringify({ projectId }),
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			)

			const data = await res.json()

			if (data.success)
				projects.value = data.projects;
			else
				console.log(data.message || 'Неизвестная ошибка');
		}
		catch(err)
		{
			console.log(err);
		}
	}

	const renameProject = async (projectId, newProjectName) =>
	{
		try
		{
			const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/update`,
				{
					method: 'PATCH',
					body: JSON.stringify({ projectId, projectName: newProjectName }),
					headers: {
						'Content-Type' : "application/json"
					}
				}
			)

			const data = await res.json();

			if (data.success)
				projects.value = data.projects;
			else
				console.log(data.message || 'Неизвестная ошибка');
		}
		catch(err)
		{
			console.log(err);
		}
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
