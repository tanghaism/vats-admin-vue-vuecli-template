<template>
  <VatsLayout
    :menu="permissionStore.menu"
    :system="{
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Vats',
      subTitle: 'This is Vats',
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutIndex',
});
</script>

<script setup lang="ts">
import { usePermission } from '@/store/permission';

const permissionStore = usePermission();
</script>

<style lang="scss" scoped></style>
