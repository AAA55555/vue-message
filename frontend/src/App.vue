<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth.store'
import useToken from '@/composables/useToken'

const { refresh } = useAuth()
const { isAuthenticated } = useAuthStore()
const { getToken } = useToken()

if (!isAuthenticated && getToken()) {
  refresh()
}

const defaultLayout = 'AppLayoutDefault'
let nameLayout = useRoute().meta.layout || defaultLayout
const layout = defineAsyncComponent(() => import(`./layouts/${nameLayout}.vue` as string))
</script>

<template>
  <component :is="layout" class="bg-gray-950">
    <slot />
    <router-view />
  </component>
</template>
