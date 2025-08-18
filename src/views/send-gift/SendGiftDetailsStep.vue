<template>
  <div>
    <h1>Details</h1>
    <UiInput v-model="formData.details" placeholder="Details" />
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';

const sendGiftStore = useSendGiftStore();
const { formData } = storeToRefs(sendGiftStore);
</script>

<style scoped></style>
