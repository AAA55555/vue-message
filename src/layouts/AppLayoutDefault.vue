<script setup lang="ts">
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue'
import AppNotifications from '@/common/components/AppNotifications.vue'
</script>

<template>
  <div class="relative h-screen">
    <AppNotifications />
    <AppLayoutHeader />
    <slot></slot>
  </div>
</template>

<style scoped></style>
