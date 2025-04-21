<template>
  <div>
    <MiddleComponent v-model="userName" />
  </div>
</template>

<script setup lang="ts">
import MiddleComponent from '@/features/defineModel/MiddleComponent.vue';
import { onUpdated, ref } from 'vue';

const userName = ref('username');

onUpdated(() => {
  console.log({ userName: userName.value });
});
</script>

<style scoped></style>
