<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
import type { InputType } from '@/types/InputType'

type PropsType = InputType & {
  autocomplete?: 'on' | 'off'
}

const props = withDefaults(defineProps<PropsType>(), {
  autocomplete: 'on'
})
</script>

<template>
  <label class="flex flex-col"
    ><span v-if="props.label" class="mb-2 ml-4 text-xs lg:text-sm"> {{ props.label }} </span>
    <Field v-slot="{ field, errorMessage }" :name="props.name" v-bind="props.attrs">
      <input
        :type="props.type"
        :id="props.name"
        v-bind="field"
        :autocomplete="autocomplete"
        :class="{
          'border-2 border-red/50': errorMessage,
          'border-2 border-white': !errorMessage
        }"
        class="w-full rounded-full px-4 py-1 text-sm text-gray-950 outline-0 lg:text-base"
      />
    </Field>
    <ErrorMessage v-if="props.errorMsg" :name="name">
      <span class="ml-4 mt-1 text-xs text-red lg:text-sm">{{ props.errorMsg }}</span>
    </ErrorMessage>
  </label>
</template>

<style scoped></style>
