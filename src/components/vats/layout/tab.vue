<template>
  <a-tabs
    :activeKey="activeKey"
    :tabBarStyle="{ paddingLeft: '16px' }"
    hide-add
    type="editable-card"
    class="vats-layout-tab"
  >
    <a-tab-pane v-for="(pane, index) in panes" :key="pane.fullPath" :closable="false">
      <template #tab>
        <span class="flex items-center">
          {{ pane.title }}
          <ReloadOutlined
            class="fe-antd-icon-action text-12 leading-0 ml-8"
            v-show="pane.fullPath === activeKey"
            @click.stop="reloadPage"
          />
          <CloseOutlined
            class="fe-antd-icon-action text-12 leading-0 ml-8"
            v-show="panes.length !== 1"
            @click.stop="removeTab(index)"
          />
        </span>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VatsTab',
});
</script>

<style lang="scss" scoped>
.vats-layout-tab {
  height: 60px;
}
</style>
