import { createApp } from 'vue';
import Antd, { message, Modal } from 'ant-design-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

window.$message = message;
window.$modal = Modal;

createApp(App).use(router).use(Antd).mount('#app');

window.$message = message;
window.$modal = Modal;
