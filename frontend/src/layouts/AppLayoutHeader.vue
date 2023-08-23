<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import useAuth from '@/composables/useAuth'

const authStore = useAuthStore()
const auth = useAuth()
</script>

<template>
  <header class="bg-gray-800">
    <div class="container flex h-12 items-center justify-between">
      <router-link to="/" class="text-xl font-semibold text-white lg:text-2xl"> M </router-link>
      <router-link
        to="/login"
        class="text-sm font-normal text-white lg:text-base"
        v-if="!authStore.isAuthenticated"
      >
        <span class="hidden lg:inline-block">Вход | Регистрация</span>
        <img
          class="lg:hidden"
          src="@/assets/images/auth-logout.svg"
          alt="Вход"
          width="24"
          height="24"
        />
      </router-link>
      <button
        v-else
        class="cursor-pointer text-sm font-extrabold text-white hover:text-green"
        @click.stop="auth.logout()"
      >
        X
      </button>
    </div>
  </header>
</template>

<style scoped></style>
