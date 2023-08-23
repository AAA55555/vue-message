import IndexPage from '../views/indexPage.vue'
import type { Component } from 'vue'

type RoutesType = {
  path: string
  name: string
  component: Component
  meta: {
    title: string
    middlewares?: string[]
  }
}

const routers: RoutesType[] = [
  {
    path: '/',
    name: 'HomePage',
    component: IndexPage,
    meta: {
      title: 'Социальная сеть',
      middlewares: ['auth']
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
