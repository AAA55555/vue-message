import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DirectusUser } from '@directus/sdk'
import { Directus } from '@/common/constants'

type UserType = DirectusUser<any> & {}

export const useUserStore = defineStore('user', () => {
  const userData = ref<null | UserType>(null)
  const setParamUser = (payload: UserType) => {
    if (typeof payload === 'object' && !Array.isArray(payload)) {
      userData.value = {} as UserType
      Object.keys(payload).forEach((el: keyof UserType) => {
        if (payload[el] !== null && userData.value !== null) {
          if (el === 'avatar') {
            userData.value[el] = `${Directus.BASE_URL}/assets/${payload[el]}`
          } else {
            userData.value[el] = payload[el]
          }
        }
      })
    } else if (Array.isArray(payload)) {
      console.error('Не верный тип данных')
    }
  }

  const resetParamUser = () => {
    userData.value = null
  }

  return { userData, setParamUser, resetParamUser }
})
