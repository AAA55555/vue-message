<script setup lang="ts">
type MessageType = {
  avatar?: string
  name: string
  message: string
}

const props = defineProps<MessageType>()
</script>

<template>
  <div class="message">
    <div class="message-photo">
      <img v-if="props.avatar" :src="props.avatar" :alt="props.name" width="48" height="48" />
      <div
        class="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 lg:h-12 lg:w-12"
      >
        A
      </div>
    </div>
    <div class="message-content">
      <div class="message-header">
        <p class="message-name">{{ props.name }}</p>
        <time class="message-time">10:00</time>
      </div>
      <p>{{ props.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.message {
  @apply flex items-start;
}

.message-photo {
  @apply mr-4;
}

.message-header {
  @apply mb-1.5 flex items-baseline;
}

.message-name {
  @apply mr-2 font-semibold;
}

.message-time {
  @apply text-xs text-gray-400 lg:text-sm;
}
</style>
