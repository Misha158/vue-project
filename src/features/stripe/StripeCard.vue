<template>
  <div class="w-[400px] mx-auto my-10 p-6 border rounded-xl shadow-sm">
    <h3 class="text-lg font-semibold mb-4">Add credit card</h3>

    <!-- Cardholder name -->
    <div class="mb-3">
      <input
        v-model="cardholderName"
        type="text"
        placeholder="Cardholder name"
        class="w-full px-3 py-2 border rounded-md"
      />
    </div>

    <!-- Card number -->
    <div class="mb-3">
      <div id="card-number-element" class="stripe-input"></div>
    </div>

    <!-- Expiry + CVC -->
    <div class="grid grid-cols-2 gap-3 mb-3">
      <div id="card-expiry-element" class="stripe-input"></div>
      <div id="card-cvc-element" class="stripe-input"></div>
    </div>

    <!-- Save for next time -->
    <div class="flex items-center mb-5">
      <input id="save-card" type="checkbox" v-model="saveForNextTime" class="mr-2" />
      <label for="save-card" class="text-sm">Save this card for next time</label>
    </div>

    <!-- Submit -->
    <div class="flex justify-center">
      <UiButton style-type="secondary" :disabled="isSubmitLoading" @click="handleSubmit">
        Save
        <IconSpinner v-if="isSubmitLoading" class="inline-block ms-2" />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeCardNumberElement,
  type StripeCardExpiryElement,
  type StripeCardCvcElement,
} from '@stripe/stripe-js';
import axios from 'axios';

const loading = ref(false);
const error = ref('');
const success = ref(false);

const isSubmitLoading = ref<boolean>(false);
const cardholderName = ref<string>('');
const saveForNextTime = ref<boolean>(false);

let stripe: Stripe | null;
let elements: StripeElements;
let cardNumberElement: StripeCardNumberElement;
let cardExpiryElement: StripeCardExpiryElement;
let cardCvcElement: StripeCardCvcElement;

// Используем переменную окружения для публичного ключа Stripe
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

onMounted(async () => {
  try {
    stripe = await loadStripe(STRIPE_PUBLIC_KEY);

    if (stripe) {
      elements = stripe.elements({
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': { color: '#a0aec0' },
          },
          invalid: {
            color: '#e53e3e',
          },
        },
      });

      cardNumberElement = elements.create('cardNumber');
      cardNumberElement.mount('#card-number-element');

      cardExpiryElement = elements.create('cardExpiry');
      cardExpiryElement.mount('#card-expiry-element');

      cardCvcElement = elements.create('cardCvc');
      cardCvcElement.mount('#card-cvc-element');
    }
  } catch (err: any) {
    error.value = err.message || 'Stripe initialization failed.';
  }
});

const handleSubmit = async () => {
  if (!stripe) return;

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
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: cardholderName.value,
        },
      },
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
