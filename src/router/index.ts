import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  RouteLocationRaw,
} from 'vue-router';
import { usePermission, IGroup } from '@/store/permission';
import Layout from '@/layout/index.vue';
import test from './routes/test';

// 设置Layout组件的重定向地址
function setIndexRedirect() {
  // 判断当前用户是否第一次进入layout
  let isFirstEnter = true;
  return (
    toRoute: RouteLocationNormalized,
    next: (route?: RouteLocationRaw) => void,
    menu: IGroup[],
  ) => {
    return next();
    if (toRoute.name !== 'Index') {
      isFirstEnter && toRoute.name !== '404'
        ? next({ path: toRoute.path, force: isFirstEnter, replace: true })
        : next();
      isFirstEnter = false;
    } else {
      if (menu.length > 0) {
        menu[0].children?.length > 0 ? next(menu[0].children[0].path) : next(menu[0].path);
      } else {
        next();
      }
    }
  };
}

// 用来匹配菜单和路由的对象
export const routeMap: { [key: string]: RouteRecordRaw } = {
  ...test,
};

// 完整的项目路由链路
const children = Object.keys(routeMap).map((key: string) => routeMap[key]);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Layout,
      meta: {
        title: 'Vats',
        icon: '',
      },
      beforeEnter(to, from, next) {
        const permissionStore = usePermission();
        setIndexRedirect()(to, next, permissionStore.menu);
      },
      children: [...children],
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/error/404.vue'),
      meta: { title: '页面未找到', icon: '' },
    },
  ],
});

export default router;
