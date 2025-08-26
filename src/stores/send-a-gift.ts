import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { deleteSendGiftFromLC, getSendGiftFromLC } from '@/services/sendGifts.ts';

const defaultFormData = {
  details: '',
  tag: '',
  recipients: [],
};

export const useSendGiftStore = defineStore('send-a-gift', () => {
  const currentStep = ref(1);

  const formData = reactive({ ...defaultFormData });

  const isNextBtnDisabled = computed(() => {
    if (currentStep.value === 1) {
      return !formData.details;
    }

    if (currentStep.value === 2) {
      return !formData.tag;
    }

    if (currentStep.value === 3) {
      return !formData.recipients.length;
    }

    if (currentStep.value === 4) {
      return !formData.recipients.length || !formData.tag || !formData.details;
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
    alert(JSON.stringify(formData));
  };

  const setDataFromLC = () => {
    const data = getSendGiftFromLC();

    currentStep.value = data?.currentStep || 1;
    Object.assign(formData, data?.formData || { ...defaultFormData });
  };

  const resetForm = () => {
    deleteSendGiftFromLC();
    currentStep.value = 1;
    Object.assign(formData, { ...defaultFormData });
  };

  return {
    formData,
    currentStep,
    isNextBtnDisabled,
    backBtnText,
    nextBtnText,
    sendGifts,
    setDataFromLC,
    resetForm,
  };
});
