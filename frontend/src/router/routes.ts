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
  },
  {
    path: '/message',
    name: 'MassagePage',
    component: () => import('../views/MessagePage.vue'),
    meta: {
      title: 'Сообщение',
      middlewares: ['auth']
    }
  }
]

export default routers
