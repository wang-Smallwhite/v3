export const routes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页', icon: 'House' },
  },
  {
    path: '/WatermarkOne',
    name: 'WatermarkOne',
    component: () => import('@/views/watermarkPages/watermarkPages.vue'),
    meta: { title: '水印页面一', icon: 'Document' },
  },
  {
    path: '/encrypted-page',
    name: 'EncryptedPage',
    component: () => import('@/views/encryptedPage/EncryptedPage.vue'),
    meta: { title: '加密页面', icon: 'Lock' },
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
