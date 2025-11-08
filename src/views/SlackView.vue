<template>
  <div>
    <h1 class="page-title">Slack</h1>
    <textarea class="mt-10 border border-b-black min-w-full h-[500px] p-10" v-model="text" />
    <UiButton class="mt-5" :disabled="!text || isLoading" :loading="isLoading" @click="sendToSlack">
      Send
    </UiButton>
    <div v-if="status" class="mt-4 p-3 rounded" :class="statusClass">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import UiButton from '@/components/UiButton.vue';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const text = ref('');
const status = ref('');
const isLoading = ref(false);

const statusClass = computed(() => {
  if (status.value.includes('✅')) {
    return 'bg-green-100 text-green-800 border border-green-300';
  } else if (status.value.includes('❌') || status.value.includes('⚠️')) {
    return 'bg-red-100 text-red-800 border border-red-300';
  }
  return 'bg-gray-100 text-gray-800 border border-gray-300';
});

const sendToSlack = async () => {
  if (!text.value.trim()) {
    status.value = '⚠️ Message cannot be empty.';
    return;
  }

  isLoading.value = true;
  status.value = '';

  try {
    const response = await axios.post(`${API_BASE_URL}/slack/send`, {
      text: text.value,
    });

    if (response.data.success) {
      status.value = '✅ Sent successfully!';
      text.value = '';
    } else {
      status.value = '❌ Error sending message.';
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        const messages = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(', ')
          : err.response.data.message;
        status.value = `❌ ${messages}`;
      } else {
        status.value = '❌ Error sending message. Check server connection.';
      }
    } else {
      status.value = '⚠️ Network error.';
    }
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
