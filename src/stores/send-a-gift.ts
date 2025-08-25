import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSendGiftStore = defineStore('send-a-gift', () => {
  const currentStep = ref(1);

  const formData = reactive({
    details: '',
    tags: [],
    recipients: [],
  });

  const isNextBtnDisabled = computed(() => {
    if (currentStep.value === 1) {
      return !formData.details;
    }

    if (currentStep.value === 2) {
      return !formData.tags.length;
    }

    if (currentStep.value === 3) {
      return !formData.recipients.length;
    }

    if (currentStep.value === 4) {
      return !formData.recipients.length || !formData.tags.length || !formData.details;
    }

    return true;
  });

  const backBtnText = computed(() => {
    if (currentStep.value === 1) {
      return 'Home';
    }

    return 'Back';
  });

  const nextBtnText = computed(() => {
    if (currentStep.value === 4) {
      return 'Looking good';
    }

    return 'Next';
  });

  const sendGifts = () => {
    alert(formData);
  };

  return { formData, currentStep, isNextBtnDisabled, backBtnText, nextBtnText, sendGifts };
});
