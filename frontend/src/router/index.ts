import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import * as index from '@/middlewares'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  const loggedIn = useAuthStore().isAuthenticated

  if (loggedIn) {
    const title = to.meta.title as unknown
    document.title = typeof title === 'string' ? title : 'Социальная сеть'
  }

  const middlewares = to.meta.middlewares as unknown
  if (!Array.isArray(middlewares)) {
    next()
  } else if (Array.isArray(middlewares) && middlewares.length) {
    // Запускается обход по middlewares
    const context = { to, next }
    const firstMiddlewareIndex = 0
    const nextMiddlewareIndex = 1
    const middlewareFn = index[middlewares[firstMiddlewareIndex] as keyof typeof index] as Function
    return middlewareFn({
      ...context,
      nextMiddleware: index.middlewarePipeline({
        context,
        middlewares,
        index: nextMiddlewareIndex
      })
    })
  }
})

export default router
