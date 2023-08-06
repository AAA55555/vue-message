<script setup lang="ts">
import { string } from 'yup'
import LoginForm from '@/modules/login/components/LoginForm.vue'
import type { InputTextType } from '@/common/types/InputTextType'

const formSchema: InputTextType[] = [
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

const onSubmit = (event: object) => {
  console.log(event)
}
</script>

<template>
  <section class="container flex items-center justify-center" style="height: calc(100vh - 48px)">
    <div class="flex flex-col items-center rounded-2xl bg-gray-800 px-10 py-8">
      <h1 class="mb-16 text-5xl text-white">M</h1>
      <LoginForm @on-submit="onSubmit" :form-schema="formSchema" v-slot="item">{{
        item.items
      }}</LoginForm>
    </div>
  </section>
</template>
