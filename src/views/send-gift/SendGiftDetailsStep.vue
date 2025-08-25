<template>
  <div>
    <h1>Details</h1>
    <UiInput ref="detailsInput" v-model="formData.details" placeholder="Details" />
  </div>
</template>

<script setup lang="ts">
import UiInput from '@/components/UiInput.vue';
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const sendGiftStore = useSendGiftStore();
const { formData } = storeToRefs(sendGiftStore);

const detailsInput = ref<InstanceType<typeof UiInput> | null>(null);

onMounted(() => {
  // если UiInput внутри использует <input>, можно пробросить focus()
  (detailsInput.value?.$el as HTMLInputElement)?.focus();
});
</script>

<style scoped></style>
