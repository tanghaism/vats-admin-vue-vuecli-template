<template>
  <a-layout class="vats-h-full">
    <!--  PC端侧边栏  -->
    <div
      v-show="!layoutState.isMobile"
      :class="{ 'vats-layout-transition': !layoutState.isMobile }"
      :style="{ width: siderWidth }"
    />
    <a-layout-sider
      v-show="!layoutState.isMobile"
      v-model:collapsed="layoutState.collapsed"
      collapsible
      :trigger="null"
      class="vats-layout-sider vats-h-full vats-flex vats-flex-column"
    >
      <VatsSider :system="system" :collapsed="layoutState.collapsed" :menu="menu" />
    </a-layout-sider>
    <!--  移动端侧边栏  -->
    <a-drawer
      placement="left"
      width="200px"
      :closable="false"
      :visible="drawerSiderVisible"
      :bodyStyle="{ padding: 0, height: '100%' }"
      @close="layoutState.collapsed = false"
    >
      <a-layout-sider
        class="vats-h-full vats-flex vats-flex-column"
        collapsible
        theme="light"
        style="overflow: hidden"
        :collapsed="false"
        :trigger="null"
      >
        <VatsSider :system="system" :collapsed="layoutState.collapsed" :menu="menu" />
      </a-layout-sider>
    </a-drawer>
    <!--  内容布局  -->
    <a-layout>
      <a-layout-header class="vats-layout-header vats-flex">
        <VatsHeader
          :collapsed="layoutState.collapsed"
          :userInfo="userInfo"
          @handleMenuToggle="layoutState.collapsed = !layoutState.collapsed"
        />
      </a-layout-header>
      <a-layout-content>
        <router-view v-slot="{ Component }">
          <transition name="slid-up" mode="out-in">
            <keep-alive :include="cachedPage">
              <component :is="Component" :key="(Component || {}).name" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VatsLayout',
});
</script>

<script lang="ts" setup>
import { defineProps, reactive, toRefs, withDefaults, onBeforeUnmount, computed } from 'vue';
import VatsSider from './sider.vue';
import VatsHeader from './header.vue';
import { isMobile } from '../utils/isMobile';
import { debounced } from '../utils/debounced';
import { ISystem, IMenu, ILayoutSate, IUserInfo } from './types.d';

interface IProps {
  system?: ISystem;
  menu: IMenu[];
  userInfo: IUserInfo;
}

const props = withDefaults(defineProps<IProps>(), {
  menu: () => [],
});

const { system, menu, userInfo } = toRefs(props);

const mobile = isMobile();

const layoutState = reactive<ILayoutSate>({
  collapsed: mobile,
  isMobile: mobile,
  transition: true,
});

const siderWidth = computed(() => (layoutState.collapsed ? '80px' : '200px'));

const drawerSiderVisible = computed(() => !layoutState.collapsed && layoutState.isMobile);

// 监听页面resize事件
const onResize = () =>
  debounced(() => {
    if (layoutState.collapsed && window?.innerWidth > 1200) {
      layoutState.collapsed = false;
    } else if (!layoutState.collapsed && window?.innerWidth <= 1200) {
      layoutState.collapsed = true;
    }
    if (layoutState.isMobile && window?.innerWidth > 750) {
      layoutState.isMobile = false;
    } else if (!layoutState.isMobile && window?.innerWidth <= 750) {
      layoutState.isMobile = true;
    }
  }, 250)();
// 初始化
onResize();
// 开始监听窗口尺寸变化
window?.addEventListener('resize', onResize, false);
// 移除监听窗口尺寸变化
onBeforeUnmount(() => {
  window?.removeEventListener('resize', onResize, false);
});

const cachedPage = [];
</script>

<style lang="scss">
.vats-h-full {
  min-height: 100vh;
}
.vats-layout-sider.ant-layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;
}
.vats-layout-header.ant-layout-header {
  padding: 0 12px;
  height: 48px;
  background: #ffffff;
}
</style>
