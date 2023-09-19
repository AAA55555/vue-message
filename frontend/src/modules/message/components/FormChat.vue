<script setup lang="ts">
import TextareaCustom from '@/common/components/TextareaCustom.vue'
</script>

<template>
  <form>
    <div class="chat">
      <textarea-custom />
      <button class="chat-btn">></button>
    </div>
  </form>
</template>

<style scoped>
.chat {
  @apply flex items-start justify-between overflow-hidden rounded-2xl bg-gray-700;
}

.chat-btn {
  @apply px-4 py-2 font-semibold hover:bg-gray-600  2xl:py-3;
}
</style>
