import { App } from 'vue';
import './theme/theme.scss';

import vPermission from './directive/v-permission';
import vLoading from './directive/v-loading';

import VatsLoading from './loading/index.vue';
import VatsLayout from './layout/index.vue';

export default {
  install(app: App) {
    // 指令挂载
    [vPermission, vLoading].forEach(directive => {
      app.use(directive);
    });

    // 组件挂载
    [VatsLoading, VatsLayout].forEach(component => {
      app.component(component.name, component);
    });
  },
};

export { vPermission, vLoading, VatsLoading };
