import { createRouter, createWebHistory } from 'vue-router'
import CustomerListView from '../views/CustomerListView.vue'
import CustomerDetailView from '../views/CustomerDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CustomerListView
    },
    {
      path: '/customer/:id',
      name: 'customer',
      component: CustomerDetailView,
    }
  ]
})

export default router
