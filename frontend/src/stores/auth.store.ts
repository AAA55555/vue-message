import { defineStore } from 'pinia'
import { ref } from 'vue'

type ParamsType = {
  expires: number
  access_token: string
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const paramsAuth = ref<ParamsType | null>(null)
  const SuccessMessage = 'Successfully'
  const isRegister = ref(false)

  const resetStore = () => {
    isAuthenticated.value = false
    paramsAuth.value = null
    isRegister.value = false
  }

  const setAuthParams = (payload: ParamsType) => {
    paramsAuth.value = payload
    isAuthenticated.value = true
  }

  return { setAuthParams, isAuthenticated, paramsAuth, SuccessMessage, resetStore, isRegister }
})
