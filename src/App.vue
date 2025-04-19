<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useInactivityWatcher } from '@/composables/useInactivityWatcher';

useInactivityWatcher({
  timeoutMs: 5_000, // 5 секунд (для теста)
  checkIntervalMs: 2_000,
  onInactive: () => {
    console.log('⏳ User is inactive — custom handler!');
    window.location.reload();
  },
});
</script>

<style scoped></style>
