export const routes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', icon: 'House' },
  },
  {
    path: '/WatermarkOne',
    name: 'WatermarkOne',
    component: () => import('@/views/watermarkPages/watermarkPages.vue'),
    meta: { title: '水印页面一', icon: 'Document' },
  },
  {
    path: '/before-leaving',
    name: 'beforeLeaving',
    meta: { title: '离开前提示', icon: 'Warning' },
    children: [
      {
        path: '/before-refresh-page',
        name: 'BeforeRefreshPage',
        component: () => import('@/views/beforeLeaving/beforeRefreshPage.vue'),
        meta: { title: '刷新前页面', icon: 'RefreshLeft' },
      },
      {
        path: '/before-leaving-page',
        name: 'BeforeLeavingPage',
        component: () => import('@/views/beforeLeaving/beforeLeavingPage.vue'),
        meta: { title: '离开前页面', icon: 'Lock' },
      },
    ]

  },

  {
    path: '/hook-page',
    name: 'HookPage',
    meta: { title: 'Hook 页面', icon: 'Tickets' },
    children: [
      {
        path: '/hook-one',
        name: 'HookOne',
        component: () => import('@/views/hookPages/hookOne.vue'),
        meta: { title: 'Hook 页面一', icon: 'Document' },
      },
      {
        path: '/hook-two',
        name: 'HookTwo',
        component: () => import('@/views/hookPages/hookTwo.vue'),
        meta: { title: 'Hook 页面二', icon: 'Document' },
      }
    ]
  }
]
