// libs
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

//base
import App from './App.vue'
import '~/style.scss';

// Global components
import Icon from './components/ui/Icon.vue';
import Popup from './components/ui/Popup.vue';

// Components for router
import Projects from '@/Projects/Projects.vue';
import CompletedTasks from '@/CompletedTasks/CompletedTasks.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ name: 'index', path: '/', component: Projects },
		{ name: 'completed', path: '/completed', component: CompletedTasks }
	]
});

const app = createApp(App);

// Global components registration
app.component('Icon', Icon);
app.component('Popup', Popup);

app.use(createPinia())
app.use(router);
app.mount('#app');
