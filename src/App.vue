<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useInactivityWatcher } from '@/composables/useInactivityWatcher';

// useInactivityWatcher({
//   timeoutSec: 5, // теперь в секундах
//   checkIntervalSec: 5,
//   onInactive: () => {
//     console.log('⏳ User is inactive — custom handler!');
//     window.location.reload();
//   },
// });
</script>

<style scoped></style>
