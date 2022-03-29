<template>
  <a-layout class="vats-h-full">
    <!--  PC端侧边栏  -->
    <div
      v-show="!layoutState.isMobile"
      :class="{ 'vats-layout-transition': !layoutState.isMobile }"
      :style="{ width: siderWidth }"
    />
    <a-layout-sider
      :collapsed-width="siderWidth"
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
      <a-layout-header class="vats-layout-header vats-flex" />
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
import { defineProps, reactive, toRefs, withDefaults, computed } from 'vue';
import VatsSider from './sider.vue';
import { ISystem, IMenu, ILayoutSate } from './types.d';

interface IProps {
  system?: ISystem;
  menu: IMenu[];
}

const props = withDefaults(defineProps<IProps>(), {
  menu: () => [],
});

const { system, menu } = toRefs(props);

const layoutState = reactive<ILayoutSate>({
  collapsed: false,
  isMobile: false,
  transition: true,
});

const siderWidth = computed(() => (layoutState.collapsed ? '80px' : '200px'));

const drawerSiderVisible = computed(() => !layoutState.collapsed && layoutState.isMobile);

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
  height: 48px;
  background: #ffffff;
}
</style>
