<template>
  <div>
    <div id="card-element"></div>
    <button @click="handleSubmit" :disabled="loading">
      {{ loading ? 'Processing...' : 'Save Card' }}
    </button>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">Card saved successfully!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const loading = ref(false);
const error = ref('');
const success = ref(false);

let stripe: any = null;
let elements: any = null;
let cardElement: any = null;

// Используем переменную окружения для публичного ключа Stripe
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

onMounted(async () => {
  try {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    if (!stripe) {
      error.value = 'Failed to load Stripe.';
      return;
    }

    elements = stripe.elements();
    cardElement = elements.create('card');
    cardElement.mount('#card-element');
  } catch (err: any) {
    error.value = err.message || 'Stripe initialization failed.';
  }
});

const handleSubmit = async () => {
  if (!stripe || !cardElement) return;

  loading.value = true;
  error.value = '';
  success.value = false;

  try {
    // 1️⃣ Получаем clientSecret с сервера
    const res = await axios.post('http://localhost:3999/create-setup-intent');
    const clientSecret = res.data.clientSecret; // Axios автоматически парсит JSON
    console.log({ clientSecret });

    // 2️⃣ Подтверждаем SetupIntent с помощью Stripe.js
    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (result.error) {
      error.value = result.error.message;
    } else {
      success.value = true;
    }
  } catch (err: any) {
    error.value = err.message || 'Payment failed.';
  } finally {
    loading.value = false;
  }
};
</script>

<style>
#card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
