<template>
  <a-select :value="rootSetting.lang" placeholder="请选择语言" @change="rootSetting.setLang">
    <a-select-option
      v-for="item in LANG_OPTION"
      :key="item.lang"
      :value="item.lang"
      :disabled="item.disabled"
    >
      <span role="img" aria-label="China">{{ item.flag }}</span>
      &nbsp;&nbsp;{{ item.name }}
    </a-select-option>
  </a-select>
  {{ $t('common.test') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardIndex',
});
</script>

<script lang="ts" setup>
import { useRoot } from '@/store/root';
import { LANG_OPTION } from '@/constants/options';

const rootSetting = useRoot();
</script>

<style scoped lang="scss"></style>
