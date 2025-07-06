import { createApp } from 'vue'
import '~/style.scss';
import App from './App.vue'
import { createPinia } from 'pinia';

import Icon from './components/ui/Icon.vue';

const app = createApp(App);
app.component('Icon', Icon);
app.use(createPinia())
app.mount('#app');
