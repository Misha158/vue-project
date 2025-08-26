<template>
  <div class="flex flex-col min-h-screen mx-auto px-4 pt-6 pb-28">
    <!-- Sticky Header -->
    <header class="flex items-center justify-between mb-6 sticky top-0 bg-white z-20 py-4 border-b">
      <div class="text-xl font-bold text-gray-800">🎁 GiftForm</div>

      <div class="text-sm text-gray-500">Step {{ currentStep }} of {{ totalSteps }}</div>

      <button @click="resetForm" class="text-gray-400 hover:text-red-500 text-xl cursor-pointer">
        ×
      </button>
    </header>

    <!-- Main content -->
    <main class="flex justify-center items-center">
      <router-view />
    </main>

    <!-- Sticky Footer -->
    <footer
      class="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t py-4 px-4 z-20 flex justify-center mx-auto"
    >
      <UiButton @click="onBack" variant="secondary" class="me-5">{{ backBtnText }}</UiButton>
      <UiButton :disabled="isNextBtnDisabled" @click="onNext">{{ nextBtnText }}</UiButton>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/UiButton.vue';
import { RouterType } from '@/consts/route.ts';
import { useRoute, useRouter } from 'vue-router';
import { onUnmounted, ref, watch } from 'vue';
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';
import { saveSendGiftToLC } from '@/services/sendGifts.ts';

const totalSteps = 4;

defineEmits<{
  (e: 'back'): void;
  (e: 'next'): void;
  (e: 'close'): void;
}>();

const router = useRouter();
const route = useRoute();

const sendGiftStore = useSendGiftStore();
const { formData, currentStep, isNextBtnDisabled, backBtnText, nextBtnText } =
  storeToRefs(sendGiftStore);

const resetForm = () => {
  router.push({ name: RouterType.SEND_GIFT });
};

const onBack = () => {
  if (currentStep.value === 1) {
    router.push({ name: RouterType.SEND_GIFT });
    return;
  }

  currentStep.value = currentStep.value - 1;
  saveSendGiftToLC({ currentStep: currentStep.value, formData: formData.value });
};
const onNext = () => {
  if (currentStep.value === 4) {
    sendGiftStore.sendGifts();
    router.push({ name: RouterType.SEND_GIFT });
    return;
  }
  currentStep.value = currentStep.value + 1;
  saveSendGiftToLC({ currentStep: currentStep.value, formData: formData.value });
};

const getAppropriateRouteName = (
  currentStep: number,
):
  | RouterType.SEND_GIFT_DETAILS
  | RouterType.SEND_GIFT_TAGS
  | RouterType.SEND_GIFT_RECIPIENTS
  | RouterType.SEND_GIFT_SUMMARY => {
  if (currentStep === 1) {
    return RouterType.SEND_GIFT_DETAILS;
  }

  if (currentStep === 2) {
    return RouterType.SEND_GIFT_TAGS;
  }

  if (currentStep === 3) {
    return RouterType.SEND_GIFT_RECIPIENTS;
  }

  if (currentStep === 4) {
    return RouterType.SEND_GIFT_SUMMARY;
  }

  return RouterType.SEND_GIFT_RECIPIENTS;
};

watch(currentStep, () => {
  router.push({
    name: getAppropriateRouteName(currentStep.value),
    query: { mode: route.query.mode },
  });
});

sendGiftStore.setDataFromLC();

onUnmounted(() => {
  sendGiftStore.resetForm();
});
</script>
