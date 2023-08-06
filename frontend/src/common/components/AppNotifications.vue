<script setup lang="ts">
import { ref } from 'vue'

type NotificationType = 'info' | 'error' | 'success'

const type: NotificationType = 'success'
const isShowOpen = ref(false)
</script>

<template>
  <transition name="note-fade">
    <div v-if="isShowOpen" class="notification__wrapper" :class="`notification__wrapper_${type}`">
      <p class="notification__text">text</p>
      <button @click.stop="isShowOpen = !isShowOpen" class="notification__close">x</button>
    </div>
  </transition>
</template>

<style scoped>
.notification__wrapper {
  @apply absolute right-1/2 top-[10%] flex w-[calc(100%-40px)] rounded-2xl border border-white p-4 pr-6 max-sm:translate-x-1/2 sm:right-[10%] sm:w-72 lg:p-5 lg:pr-7;
}

.notification__text {
  @apply text-xs text-white lg:text-sm 2xl:text-base;
}

.notification__close {
  @apply absolute right-[5%] top-[5%] p-2 text-white;
}

.notification__wrapper_info {
  @apply border-blue-800 bg-blue-800/5;
}

.notification__wrapper_error {
  @apply border-red bg-red/5;
}

.notification__wrapper_success {
  @apply border-green bg-green/5;
}

.note-fade-enter-active {
  transition: all 0.1s ease-out;
}

.note-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.note-fade-enter-from,
.note-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
