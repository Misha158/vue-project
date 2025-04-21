<template>
  <div>
    <input v-model="name" type="text" />
  </div>
</template>

<script setup lang="ts">
const name = defineModel();
</script>

<style scoped></style>
