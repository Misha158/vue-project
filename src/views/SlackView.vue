<template>
  <div>
    <h1 class="page-title">Slack</h1>
    <textarea class="mt-10 border border-b-black min-w-full h-[500px] p-10" v-model="text" />
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import { ref } from 'vue';

const text = ref('');
</script>

<style scoped></style>
