// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'HOME',
        component: () => import('@/views/Home.vue'),
      }
    ],
  },

  {
    path: '/About',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ABOUT',
        component: () => import('@/views/About.vue'),
      }
    ],
  },
  {
    path: '/l5it03',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'L5IT03',
        component: () => import('@/views/l5it03.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
