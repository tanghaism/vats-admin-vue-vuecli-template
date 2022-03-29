import { defineStore, StoreGetters } from 'pinia';
import { RouteMeta } from 'vue-router';

export interface IGroup {
  name: string;
  path: string;
  meta: RouteMeta;
  children: IGroup[];
  [props: string]: unknown;
}

export type IPermissionState = {
  permissionMap: Record<string, boolean>;
  menu: IGroup[];
};

export type IPermissionActions = {
  setPermissionMap(permissionData: string[]): void;
  // setMenu(menuData: unknown): Promise<void>;
};

export const usePermission = defineStore<
  string,
  IPermissionState,
  StoreGetters<unknown>,
  IPermissionActions
>('permission', {
  state() {
    return {
      permissionMap: {},
      menu: [],
    };
  },
  actions: {
    // 组装权限点
    setPermissionMap(permissionData) {
      const permission: IPermissionState['permissionMap'] = {};
      permissionData.forEach(key => {
        permission[key] = true;
      });
      this.permissionMap = {
        ...permission,
      };
    },
    // 组装侧边栏导航
    // async setMenu(menuData) {
    //   try {
    //   } catch (e) {}
    // },
  },
});
