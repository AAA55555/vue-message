<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import useAuth from '@/composables/useAuth'
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const authStore = useAuthStore()
const auth = useAuth()
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const user = computed(() => {
  return {
    name:
      userData.value && typeof userData.value.first_name === 'string'
        ? userData.value.first_name
        : null,
    avatar:
      userData.value && typeof userData.value.avatar === 'string' ? userData.value.avatar : null
  }
})
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
      <div v-else class="flex items-center">
        <img v-if="user.avatar" :src="user.avatar" alt="avatar" width="16" class="mr-4" />
        <p v-if="user.name" class="mr-4">{{ user.name }}</p>
        <button
          class="cursor-pointer text-sm font-extrabold text-white hover:text-green"
          @click.stop="auth.logout()"
        >
          X
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
