import { useAuthStore } from '@/stores/auth.store'
import useToken from '@/composables/useToken'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

type PayloadType = {
  next: NavigationGuardNext
  nextMiddleware: Function
  to: RouteLocationNormalized
}
export default function auth({ next, to, nextMiddleware }: PayloadType) {
  const storeAuth = useAuthStore()
  if (useToken().getToken() && !storeAuth.isAuthenticated) {
    return nextMiddleware()
  } else if (!storeAuth.isAuthenticated) {
    if (to.name !== 'LoginPage') {
      return next({ name: 'LoginPage' })
    }
  }

  return nextMiddleware()
}
