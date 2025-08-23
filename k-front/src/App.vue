<script setup>
	import { ref, provide } from 'vue';

	import Toaster from '@/Toaster.vue';
	import Header from '@/Header.vue';

	const projects = ref([]);
	provide('projects', projects);
</script>

<template>
	<Toaster />
	<Header />
	<RouterView />
	<Popup />
</template>
