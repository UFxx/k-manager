<script setup>
	const props = defineProps({
		taskId: {
			type: Number,
			required: true
		},
		canEditTask: {
			type: Boolean,
			required: true
		}
	})

	const emit = defineEmits(['toggleCanEditTask']);
</script>

<template>
	<td>
		<button
			v-if="!props.canEditTask"
			@click="emit('toggleCanEditTask')"
		>
			Изменить задачу
		</button>
		<template v-else>
			<button @click="emit('toggleCanEditTask', 'edit')">
				Да
			</button>
			<button @click="emit('toggleCanEditTask', 'cancel')">
				Нет
			</button>
		</template>
	</td>
</template>

<style lang='scss'></style>