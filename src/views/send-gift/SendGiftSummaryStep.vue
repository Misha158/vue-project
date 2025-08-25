<template>
  <div>
    <h1>Summary!</h1>
    <div>
      <div>Details</div>
      <div>{{ formData.details }}</div>
    </div>
    <div>
      <div>Tags</div>
      <div>{{ formData.tags }}</div>
    </div>
    <div>
      <div>Recipients</div>
      <div>{{ formData.recipients }}</div>
    </div>
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
