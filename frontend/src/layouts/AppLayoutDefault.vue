<script setup lang="ts">
import AppLayoutHeader from '@/layouts/AppLayoutHeader.vue'
import AppNotifications from '@/common/components/AppNotifications.vue'
import { useRoute } from 'vue-router'
</script>

<template>
  <div class="relative h-screen">
    <AppNotifications />
    <AppLayoutHeader />
    <div class="container" :class="{ 'mt-24': useRoute().path !== '/login' }"><slot></slot></div>
  </div>
</template>
