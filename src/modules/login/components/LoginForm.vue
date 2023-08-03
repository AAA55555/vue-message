<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { Form } from 'vee-validate'
import AppButton from '@/common/components/AppButton.vue'
import InputText from '@/common/components/InputText.vue'
import type { InputTextType } from '@/common/types/InputTextType'

const props = defineProps<{
  formSchema: InputTextType[]
}>()

const { formSchema } = toRefs(props)

const emit = defineEmits<{
  onSubmit: [event: object]
}>()

const formRef = ref<null | HTMLFormElement>(null)
const onSubmit = (values: object): void => {
  emit('onSubmit', values)
  if (formRef.value !== null) {
    formRef.value.resetForm()
  }
}
</script>

<template>
  <Form
    @submit="onSubmit"
    ref="formRef"
    class="mx-auto -mt-[20%] block max-w-[500px] text-gray-600"
  >
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
    <app-button class="mt-8" type="submit">Зарегистрироваться</app-button>
  </Form>
</template>
