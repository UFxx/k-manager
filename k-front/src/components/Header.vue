<script setup>
	import { inject } from 'vue';

	import projectsApi from '~/src/api/projects'

	import { useToastsStore } from '~/src/stores/toastsStore';
	import { useLoaderStore } from '~/src/stores/loaderStore';

	const toastsStore = useToastsStore();
	const loaderStore = useLoaderStore();
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
				v-show="loaderStore.isLoading"
				path="refresh-indicator.svg"
				size="small"
			/>
		</div>
	</header>
</template>

<style lang='scss' scoped>
	.header
	{
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 40px;
		z-index: 2;
		background-color: rgba($black-color, 0.1);
		backdrop-filter: blur(8px);

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

					&.active { box-shadow: 0 4px 4px 0 rgba($black-color, 0.25); }
				}
			}
		}
	}

	.header__add-project
	{
		button { @extend %header-button; }
	}

	@keyframes load
	{
		from { transform: rotate(0); }
		to { transform: rotate(360deg); }
	}

	.header__refresh-indicator
	{
		opacity: 0.4;
		animation: load 1.5s infinite linear;
	}
</style>