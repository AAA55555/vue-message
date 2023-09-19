<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import useAuth from '@/composables/useAuth'
import { useAuthStore } from '@/stores/auth.store'
import useToken from '@/composables/useToken'
if (!useAuthStore().isAuthenticated && useToken().getToken()) {
  useAuth().refresh()
}
</script>

<template>
  <app-layout class="bg-gray-950"><router-view /></app-layout>
</template>
