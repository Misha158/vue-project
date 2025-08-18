<template>
  <div>
    <h1>Recipients</h1>
    <UiSelect :options="options" v-model="formData.tags" mode="multiple" />
  </div>
</template>

<script setup lang="ts">
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';
import UiSelect from '@/components/UiSelect.vue';

const sendGiftStore = useSendGiftStore();
const { formData } = storeToRefs(sendGiftStore);

const options = [
  {
    label: 'Food',
    value: 'food',
  },
  {
    label: 'Games',
    value: 'games',
  },
  {
    label: 'Movies',
    value: 'movies',
  },
];
</script>

<style scoped></style>
