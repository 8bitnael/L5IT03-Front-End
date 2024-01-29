// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'LOGIN',
        component: () => import('@/views/login.vue'),
      }
    ],
  },

  {
    path: '/customize',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'CUSTOMIZE(2.1)',
        component: () => import('@/views/customize.vue'),
      }
    ],
  },
  {
    path: '/crud',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'EMPLOYEE CRUD(2.2,2.3)',
        component: () => import('@/views/crud.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
