<template>
  <div>
    <div>Child three</div>
    <div>{{ todos }}</div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const todos = inject('todos');
</script>

<style lang="scss" scoped></style>
