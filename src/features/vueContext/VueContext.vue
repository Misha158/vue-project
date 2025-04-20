<template>
  <div>
    <ChildOne />
  </div>
</template>

<script setup lang="ts">
import ChildOne from '@/features/vueContext/ChildOne.vue';

import { provide, ref } from 'vue';

const todos = ref([
  { id: 1, title: 'Todo 1' },
  { id: 2, title: 'Todo 2' },
  { id: 3, title: 'Todo 3' },
]);

provide('todos', todos);
</script>

<style scoped></style>
