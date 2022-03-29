<template>
  <div
    v-if="system"
    :class="[collapsed ? 'vats-system-close' : 'vats-system-open']"
    class="vats-system vats-flex"
  >
    <img :src="system.logo" alt="" width="32px" height="32px" v-if="system.logo" />
    <div
      class="vats-system-info vats-flex vats-flex-column vats-ellipsis"
      v-if="system.title || system.subTitle"
      v-show="!collapsed"
    >
      <a-typography-text
        v-if="system.title"
        strong
        :class="[system.subTitle ? '' : 'vats-system-title-large']"
        class="vats-system-title"
      >
        {{ system.title }}
      </a-typography-text>
      <a-typography-text v-if="system.subTitle" type="secondary">
        {{ system.subTitle }}
      </a-typography-text>
    </div>
  </div>
  <div class="vats-menu vats-flex-1">
    <a-menu
      class="vats-menu-wrap"
      mode="inline"
      :inlineCollapsed="false"
      v-model:openKeys="menuSelected.openMenus"
      v-model:selectedKeys="menuSelected.selectedMenus"
    >
      <template v-for="item in menu" :key="item.name">
        <template v-if="item.children && item.children.length > 0 && !item.meta.hideMenu">
          <a-sub-menu :key="item.name">
            <template #title>
              <span class="vats-flex">
                <i :class="item.meta.icon" v-if="!!item.meta.icon" class="anticon"></i>
                <span>{{ item.meta.title }}</span>
              </span>
            </template>
            <template v-for="child in item.children" :key="child.name">
              <a-menu-item
                :key="child.name"
                v-if="!child.meta.hideMenu"
                class="vats-flex"
                @click="jumpTo(child.name)"
              >
                <i :class="child.meta.icon" v-if="!!child.meta.icon" class="anticon"></i>
                <span>{{ child.meta.title }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
        <template v-else-if="!item.children && !item.meta.hideMenu">
          <a-menu-item :key="item.name" class="vats-flex" @click="jumpTo(item.name)">
            <i :class="item.meta.icon" v-if="!!item.meta.icon" class="anticon"></i>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VatsSider',
});
</script>

<script lang="ts" setup>
import { defineProps, withDefaults, toRefs, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ISystem, IMenu, IMenuSelected } from './types.d';

interface IProps {
  system?: ISystem;
  menu: IMenu[];
  collapsed: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  menu: () => [],
});

const { system, collapsed, menu } = toRefs(props);

const route = useRoute();
const router = useRouter();

const menuSelected = reactive<IMenuSelected>({
  openMenus: [],
  selectedMenus: [],
});

const jumpTo = (routeName: string) => {
  route.name !== routeName && router.push({ name: routeName });
};
</script>

<style lang="scss">
.vats-system {
  padding: 0 6px;
  width: 100%;
  overflow: hidden;
  &-info {
    margin-left: 8px;
    animation: vats-title-animation 0.2s;
  }
  &-title {
    color: #ffffff;
    font-size: 14px;
    &-large {
      font-size: 16px;
    }
  }
  &-close {
    padding: 0 24px;
  }
  &-open {
    padding: 0 16px;
  }
}

@keyframes vats-title-animation {
  0% {
    display: none;
    opacity: 0;
  }

  99% {
    display: none;
    opacity: 0;
  }

  100% {
    display: block;
    opacity: 1;
  }
}

.vats-menu {
  overflow-y: auto;
  overflow-x: hidden;
  &-wrap {
    min-height: 100%;
  }
}
</style>
