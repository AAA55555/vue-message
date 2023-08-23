import { useAuthStore } from '@/stores/auth.store'
import useToken from '@/composables/useToken'

interface IPayload {
  next: <T>(data: T) => T
  nextMiddleware: Function
  to: <T>(data: T) => T
}
export default function auth({ next, to, nextMiddleware }: IPayload) {
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
