<script setup lang="ts">
import { toRefs } from 'vue'

interface IProps {
  as?: string
}

const props = withDefaults(defineProps<IProps>(), {
  as: 'button'
})

const { as } = toRefs(props)
</script>

<template>
  <component
    :is="as"
    class="w-full rounded-full bg-green px-4 py-1 text-white transition hover:bg-green/70"
    ><slot></slot
  ></component>
</template>

<style scoped></style>
