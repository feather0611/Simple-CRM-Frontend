import { createRouter, createWebHistory } from 'vue-router'
import CustomerListView from '../views/CustomerListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CustomerListView
    }
  ]
})

export default router
