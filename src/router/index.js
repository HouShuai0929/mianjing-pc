import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Article from '@/views/article/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'article', component: Article }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
