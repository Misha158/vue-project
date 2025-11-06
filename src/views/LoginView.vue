<template>
  <div class="login-container">
    <div class="login-form">
      <h1 class="login-title">Вход</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <UiInput v-model="email" placeholder="Email"> Email </UiInput>

        <UiInput v-model="password" placeholder="Пароль" type="password"> Пароль </UiInput>

        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <UiButton
          type="submit"
          :loading="authStore.isLoading"
          :disabled="!email || !password"
          class="submit-button"
        >
          Войти
        </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UiInput from '@/components/UiInput.vue';
import UiButton from '@/components/UiButton.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    router.push({ name: 'home' });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.error-message {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  color: #c33;
  font-size: 14px;
}

.submit-button {
  margin-top: 8px;
  width: 100%;
}
</style>
