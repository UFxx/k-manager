<script setup>
	import Toaster from '@/Toaster.vue';
	import Header from '@/Header.vue';
	import Popup from '@/Popup.vue'
</script>

<template>
	<Toaster />
	<Header />
	<RouterView />
	<Popup />
</template>
