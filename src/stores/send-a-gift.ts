import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useSendGiftStore = defineStore('send-a-gift', () => {
  const formData = reactive({
    details: '',
    tags: [],
    recipients: [],
  });

  return { formData };
});
