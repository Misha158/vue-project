<template>
  <div class="flex flex-col min-h-screen mx-auto px-4 pt-6 pb-28">
    <!-- Sticky Header -->
    <header class="flex items-center justify-between mb-6 sticky top-0 bg-white z-20 py-4 border-b">
      <div class="text-xl font-bold text-gray-800">🎁 GiftForm</div>

      <div class="text-sm text-gray-500">Step {{ step }} of {{ totalSteps }}</div>

      <button @click="resetForm" class="text-gray-400 hover:text-red-500 text-xl cursor-pointer">
        ×
      </button>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Sticky Footer -->
    <footer
      class="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t py-4 px-4 z-20 flex justify-center mx-auto"
    >
      <UiButton @click="onBack" variant="secondary" class="me-5">Back</UiButton>
      <UiButton @click="onNext">Next</UiButton>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/UiButton.vue';
import { RouterType } from '@/router';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const totalSteps = 3;

const step = ref(1);

defineEmits<{
  (e: 'back'): void;
  (e: 'next'): void;
  (e: 'close'): void;
}>();

const router = useRouter();

const resetForm = () => {
  router.push({ name: RouterType.SEND_GIFT });
};

const onBack = () => {
  step.value = step.value - 1;
};
const onNext = () => {
  step.value = step.value + 1;
};

const getAppropriateRouteName = (
  currentStep: number,
): RouterType.SEND_GIFT_DETAILS | RouterType.SEND_GIFT_TAGS | RouterType.SEND_GIFT_RECIPIENTS => {
  if (currentStep === 1) {
    return RouterType.SEND_GIFT_DETAILS;
  }

  if (currentStep === 2) {
    return RouterType.SEND_GIFT_TAGS;
  }

  if (currentStep === 3) {
    return RouterType.SEND_GIFT_RECIPIENTS;
  }

  return RouterType.SEND_GIFT_RECIPIENTS;
};

watch(step, () => {
  router.push({ name: getAppropriateRouteName(step.value) });
});
</script>
