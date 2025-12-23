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
    component: () => import('@/views/watermarkPages/WatermarkOne.vue'),
    meta: { title: '水印页面一', icon: 'Document' },
  },
  {
    path: '/encrypted-page',
    name: 'EncryptedPage',
    component: () => import('@/views/encryptedPage/EncryptedPage.vue'),
    meta: { title: '加密页面', icon: 'Lock' },
  },
]
