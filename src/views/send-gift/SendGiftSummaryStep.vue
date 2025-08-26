<template>
  <div>
    <h1 class="text-4xl font-bold mb-10">Summary!</h1>

    <div>
      <div
        v-for="item in summary"
        :key="item.label"
        class="flex justify-between border-b border-gray-200 py-5"
      >
        <div>
          <span class="font-semibold">{{ item.label }}: </span>
          <span>{{ item.value }}</span>
        </div>
        <div class="ms-10 cursor-pointer hover:text-red-300" @click="redirects[item.label]">
          edit
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { RouterType } from '@/router';

const sendGiftStore = useSendGiftStore();
const { formData, currentStep } = storeToRefs(sendGiftStore);

const router = useRouter();

const summary = computed(() => {
  return [
    { label: 'details', value: formData.value.details },
    { label: 'tag', value: formData.value.tag },
    { label: 'recipients', value: formData.value.recipients },
  ];
});

const redirects = {
  details: () => {
    currentStep.value = 1;
    router.push({ name: RouterType.SEND_GIFT_DETAILS });
  },
  tag: () => {
    currentStep.value = 2;
    router.push({ name: RouterType.SEND_GIFT_TAGS });
  },
  recipients: () => {
    currentStep.value = 3;
    router.push({ name: RouterType.SEND_GIFT_RECIPIENTS });
  },
};
</script>
