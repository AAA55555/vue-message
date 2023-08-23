<script setup lang="ts">
import { string } from 'yup'
import LoginForm from '@/modules/login/components/LoginForm.vue'
import type { InputAuthType } from '@/types/InputAuthType'
import type { UserType } from '@/types/UserType'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Ref } from 'vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()

type FormData = UserType & {
  type: 'register' | 'login'
  formRef: Ref<HTMLFormElement>
}

const formSchema: InputAuthType[] = [
  {
    label: 'Почта',
    name: 'email',
    type: 'email',
    rules: string().email().required(),
    errorMsg: 'Введите почту'
  },
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    rules: string().required(),
    errorMsg: 'Введите пароль'
  }
]

const isShowLoader = ref(false)
const { login, register } = useAuth()

const onSubmit = async (event: object): Promise<void> => {
  isShowLoader.value = true
  if (validator(event)) {
    const { email, password, type, formRef } = event

    if (type === 'login') {
      await login({ email, password })
    } else if (type === 'register') {
      await register({ email, password })
    }
    if (useAuthStore().isAuthenticated || useAuthStore().isRegister) {
      formRef.value.resetForm()
    }
    isShowLoader.value = false
    await router.push('/')
  }
}

function validator(data: unknown): data is FormData {
  return (
    Object.prototype.hasOwnProperty.call(data, 'email') &&
    Object.prototype.hasOwnProperty.call(data, 'password') &&
    Object.prototype.hasOwnProperty.call(data, 'type') &&
    Object.prototype.hasOwnProperty.call(data, 'formRef')
  )
}
</script>

<template>
  <section class="container flex items-center justify-center" style="height: calc(100vh - 48px)">
    <div
      class="flex w-full flex-col items-center rounded-2xl bg-gray-800 px-6 py-8 sm:w-10/12 md:w-7/12 md:px-12 lg:w-6/12 lg:px-10"
    >
      <h1 class="mb-4 text-5xl text-white">M</h1>
      <LoginForm
        @on-submit="onSubmit"
        :form-schema="formSchema"
        v-slot="item"
        :isShowLoader="isShowLoader"
        >{{ item.items }}</LoginForm
      >
    </div>
  </section>
</template>
