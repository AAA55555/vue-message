<script setup lang="ts">
type PropsType = {
  borderRounded?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
  borderRounded: false
})

const emit = defineEmits<{
  onChange: [event: string]
}>()

const change = (e: Event) => {
  emit('onChange', (e.target as HTMLElement).innerText)
}

const clear = (e: Event) => {
  const event = e.target as HTMLElement
  if (event.innerText === '...') {
    event.innerText = ''
  }
}
</script>

<template>
  <div
    contenteditable="true"
    class="textarea"
    :class="{ 'rounded-2xl': props.borderRounded }"
    @keydown="change"
    @click.stop="clear"
    @focus="clear"
  >
    ...
  </div>
</template>
<style scoped>
.textarea {
  @apply max-h-40 w-full overflow-y-auto border-0 px-4 py-2 outline-0 2xl:py-3;
}
</style>
