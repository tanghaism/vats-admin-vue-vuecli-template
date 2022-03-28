import { createApp } from 'vue';
import Antd, { message, Modal } from 'ant-design-vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { initI18n } from '@/utils/i18n';
import './registerServiceWorker';
import router from './router';
import 'ant-design-vue/dist/antd.min.css';
import '@/assets/scss/index.scss';

window.$message = message;
window.$modal = Modal;

export const i18n = initI18n();

const app = createApp(App).use(router).use(createPinia()).use(Antd).use(i18n);

window.$message = message;
window.$modal = Modal;

app.mount('#app');
