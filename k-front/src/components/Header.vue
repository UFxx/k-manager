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
						<RouterLink to="/">
							Текущие
						</RouterLink>
					</li>
					<li>
						<RouterLink to="/completed">
							Сделанные
						</RouterLink>
					</li>
				</ul>
			</nav>
		</div>
		<div :class="['header__refresh-indicator', loaderStore.isLoading ? null : 'hidden']">
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
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 40px;
		background-color: rgba($black-color, 0.1);
		backdrop-filter: blur(8px);
		z-index: 3;

		@media (max-width: $tablet) { padding: 20px 10px; }

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

					&.router-link-active { @extend %box-shadow; }

					@media (max-width: $mobile) { font-size: 12px; }
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

		&.hidden
		{
			img { opacity: 0; }
		}
	}
</style>