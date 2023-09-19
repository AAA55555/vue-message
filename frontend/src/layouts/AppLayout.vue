<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const defaultLayout = 'AppLayoutDefault'
let nameLayout = useRoute().meta.layout || defaultLayout
const layout = defineAsyncComponent(() => import(`./${nameLayout}.vue` as string))
</script>

<template>
  <component :is="layout"> <slot></slot> </component>
</template>

<style scoped></style>
