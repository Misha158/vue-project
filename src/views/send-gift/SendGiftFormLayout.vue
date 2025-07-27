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

const props = defineProps<{
  step: number;
  totalSteps: number;
}>();

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
  if (props.step === 1 || !props.step) {
    router.push({ name: RouterType.SEND_GIFT });
  }
};
const onNext = () => {};
</script>
