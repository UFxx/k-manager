<script setup>
	const props = defineProps({
		path: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'x-small'].includes(value)
		}
	})
</script>

<template>
	<img
		:class="props.size"
		:src="`/icons/${props.path}`"
		alt="icon"
	/>
</template>

<style lang='scss' scoped>
	.clickable { cursor: pointer; }

	.x-small
	{
		width: 12px;
		height: 12px;
	}

	.small
	{
		width: 24px;
		height: 24px;
	}

	.medium
	{
		width: 48px;
		height: 48px;
	}
</style>