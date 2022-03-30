import { App } from 'vue';
import './theme/theme.scss';

import vPermission from './directive/v-permission';
import vLoading from './directive/v-loading';

import VatsLoading from './loading/index.vue';
import VatsLayout from './layout/index.vue';
import VatsProvider from './provider/index.vue';

import { isMobile } from './utils/isMobile';
import { debounced } from './utils/debounced';

export default {
  install(app: App) {
    // 指令挂载
    [vPermission, vLoading].forEach(directive => {
      app.use(directive);
    });

    // 组件挂载
    [VatsLoading, VatsProvider, VatsLayout].forEach(component => {
      app.component(component.name, component);
    });
  },
};

export { vPermission, vLoading, VatsLoading, VatsProvider, isMobile, debounced };
