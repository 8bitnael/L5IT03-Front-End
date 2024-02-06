// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'A login page for admins to login in each department(2.3)',
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
        name: 'Each department can customize their theme(2.1)',
        component: () => import('@/views/customize.vue'),
      }
    ],
  },
  {
    path: '/getAllEmployes',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'GET ALL EMPLOYEES FROM DB',
        component: () => import('@/views/getAllEmployes.vue'),
      }
    ],
  },
  {
    path: '/findByID',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'View employee information within the same page (2.2,2.3)',
        component: () => import('@/views/findByID.vue'),
      }
    ],
  },
  {
    path: '/crud',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Update and save employee information',
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
