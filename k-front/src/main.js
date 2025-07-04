import { createApp } from 'vue'
import '~/style.scss';
import App from './App.vue'
import { $axios } from './services/api';

const app = createApp(App);
app.use('axios', $axios);
app.mount('#app');
