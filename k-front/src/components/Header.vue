<script setup>
	import { inject } from 'vue';

	import projectsApi from '~/src/api/projects'

	import { useToastsStore } from '~/src/stores/toastsStore';

	const toastsStore = useToastsStore();
	const projects = inject('projects');

	const createNewProject = async () =>
	{
		const data = await projectsApi.createNewProject();

		if (data.success)
		{
			projects.value.push(data.project);
			toastsStore.useToast(data.message, 'success');
		}
		else toastsStore.useToast(data.message, 'error');
	}
</script>

<template>
	<header class="header">
		<div class="header__add-project">
			<button @click="createNewProject">
				Добавить проект
			</button>
		</div>
		<div class="header__menu">
			<nav>
				<ul>
					<li>
						<a
							href=""
							class="active"
						>Текущие</a>
					</li>
					<li>
						<a href="">Сделанные</a>
					</li>
				</ul>
			</nav>
		</div>
		<div class="header__refresh-indicator">
			<Icon
				path="refresh-indicator.svg"
				size="small"
			/>
		</div>
	</header>
</template>

<style lang='scss' scoped>
	.header
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 40px;

		ul
		{
			display: flex;
			column-gap: 10px;

			li
			{
				list-style: none;

				a
				{
					text-decoration: none;

					@extend %header-button;

					&.active
					{
						box-shadow: 0 4px 4px 0 rgba($black-color, 0.25);
					}
				}
			}
		}
	}

	.header__add-project
	{
		button
		{
			@extend %header-button;
		}
	}

	.header__refresh-indicator
	{
		opacity: 0;

		@include tr(0.3, opacity);

		&.active { opacity: 1; }
	}
</style>