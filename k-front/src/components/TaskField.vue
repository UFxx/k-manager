<script setup>
	defineProps({
		value: {
			type: String,
			required: true
		},
		fieldName: {
			type: String,
			required: true
		},
		taskId: {
			type: Number,
			required: true
		},
		projectId: {
			type: Number,
			required: true
		}
	})

</script>

<template>
	<td>
		<input
			v-model="model"
			type="text"
			@input="console.log(model)"
		/>
	</td>
</template>

<style lang='scss'></style>