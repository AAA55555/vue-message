import IndexPage from '../views/indexPage.vue'
import type { Component } from 'vue'

type RoutesType = {
  path: string
  name: string
  component: Component
  meta: {
    title: string
  }
}

const routers: RoutesType[] = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage,
    meta: {
      title: 'Социальная сеть'
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      title: 'Авторизация | Аутентификация'
    }
  }
]

export default routers
