export declare module 'vue-router' {
  interface RouteMeta {
    title: string; // 页面标题
    desc?: string; // 页面描述
    cached?: boolean; // 是否缓存页面，keep-alive
    noAuth?: boolean; // 路由无权限的标示，如果用户没有此路由的权限则跳转到403
    hideMenu?: boolean; // 如果侧边栏导航不显示此菜单，需要设置为true
    permission?: string; // 当前路由的权限点
    icon?: string; // icon
    selected?: string; // 跳转到隐藏菜单时，指定选中的menu-item
    breadcrumb?: { path: string; breadcrumbName: string; name: string }[]; // 面包屑导航，动态生成
  }
}
