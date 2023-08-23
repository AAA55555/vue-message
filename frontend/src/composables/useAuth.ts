import { useRouter } from 'vue-router'
import {
  createDirectus,
  authentication,
  rest,
  refresh as refreshDirectus,
  createUser,
  logout as logoutDirectus
} from '@directus/sdk'
import { Directus } from '@/common/constants'
import type { CreateUserType, UserType } from '@/types/UserType'
import useToken from '@/composables/useToken'
import { useAuthStore } from '@/stores/auth.store'
import { useNotification } from '@/stores/notification.store'

export default function () {
  const router = useRouter()
  const { getToken, saveToken } = useToken()
  const authStore = useAuthStore()
  const { setParamNotification } = useNotification()
  const directus = createDirectus(Directus.BASE_URL)

  const login = async ({ email, password }: UserType): Promise<void> => {
    try {
      const client = directus.with(authentication('json', { autoRefresh: false }))
      const data = await client.login(email, password, {})
      const { access_token, expires, refresh_token } = data
      if (access_token && expires && refresh_token) {
        authStore.setAuthParams({ access_token, expires })
        saveToken({ refresh_token, expires: expires + Date.now() })
        setParamNotification({ message: authStore.SuccessMessage, type: 'success' })
      }
    } catch (e) {
      errorFn(e)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const clientLogout = directus.with(rest())
      await clientLogout.request(logoutDirectus(<string>useToken().getToken()))
      useToken().destroyToken()
      authStore.resetStore()
      await router.push('/login')
    } catch (e) {
      errorFn(e)
    }
  }

  const refresh = async (): Promise<void> => {
    try {
      const refreshData = directus.with(authentication()).with(rest())
      if (getToken()) {
        const responseRefresh = await refreshData.request(refreshDirectus(<string>getToken()))
        const { access_token, expires, refresh_token } = responseRefresh
        if (access_token && expires && refresh_token) {
          authStore.setAuthParams({ access_token, expires })
          saveToken({ refresh_token, expires: expires + Date.now() })
        }
      } else {
        await router.push('/login')
      }
    } catch (e) {
      errorFn(e)
      useToken().destroyToken()
    }
  }

  const register = async ({
    email,
    password,
    role = 'ef80e9f6-54cf-444d-858c-aee84aabe191'
  }: CreateUserType) => {
    const params: CreateUserType = {
      email,
      password,
      role
    }
    try {
      const clientCreate = directus.with(rest())
      await clientCreate.request(createUser(params))

      authStore.isRegister = true
      setParamNotification({ message: authStore.SuccessMessage, type: 'success' })
      setTimeout(() => {
        authStore.isRegister = false
      }, 1000)
    } catch (e) {
      errorFn(e)
    }
  }

  function errorFn(e: unknown) {
    if (isErrorResponse(e)) {
      if (e.errors[0].message) setParamNotification({ message: e.errors[0].message, type: 'error' })
    } else {
      if (e instanceof Error) setParamNotification({ message: e.message, type: 'error' })
    }
  }

  type AuthErrorType = {
    errors: [
      {
        message?: string
        extensions?: {
          code: string | number
        }
      }
    ]
  }

  function isErrorResponse(data: unknown): data is AuthErrorType {
    return Object.prototype.hasOwnProperty.call(data, 'errors')
  }

  return { login, refresh, register, logout }
}
