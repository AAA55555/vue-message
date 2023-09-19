<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Form } from 'vee-validate'
import AppLoader from '@/common/components/AppLoader.vue'
import AppButton from '@/common/components/AppButton.vue'
import InputText from '@/common/components/InputText.vue'
import type { InputType } from '@/types/InputType'

const props = defineProps<{
  formSchema: InputType[]
  isShowLoader: boolean
}>()

const { formSchema, isShowLoader } = toRefs(props)

const firstBtn = ref<string>('Войти')
const secondBtn = ref<string>('Зарегистрироваться')

const changeBtn = () => {
  firstBtn.value = secondBtn.value === 'Зарегистрироваться' ? 'Зарегистрироваться' : 'Войти'
  secondBtn.value = firstBtn.value === 'Зарегистрироваться' ? 'Войти' : 'Зарегистрироваться'
}

const emit = defineEmits<{
  onSubmit: [event: object]
}>()

const typeForm = () => {
  return firstBtn.value === 'Зарегистрироваться' ? 'register' : 'login'
}

const formRef = ref<null | HTMLFormElement>(null)
const onSubmit = (values: object): void => {
  emit('onSubmit', { ...values, type: typeForm(), formRef })
}
</script>

<template>
  <Form @submit="onSubmit" ref="formRef" class="block w-full text-gray-600 lg:w-10/12">
    <div class="flex flex-col gap-y-5">
      <InputText
        v-for="({ label, name, type, errorMsg, ...attrs }, idx) in formSchema"
        :key="idx"
        :label="label"
        :attrs="attrs"
        :name="name"
        :type="type"
        :error-msg="errorMsg"
      />
    </div>
    <app-button
      v-if="!isShowLoader"
      class="mx-auto mt-8 block w-fit cursor-pointer"
      type="submit"
      >{{ firstBtn }}</app-button
    >
    <div v-else class="mt-8 flex justify-center">
      <AppLoader />
    </div>
    <div class="mt-5 flex justify-center">
      <button class="text-xs hover:opacity-50 lg:text-sm" @click.prevent="changeBtn">
        {{ secondBtn }}
      </button>
    </div>
  </Form>
</template>
