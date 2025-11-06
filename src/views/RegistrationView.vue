<template>
  <div class="registration-container">
    <div class="registration-form">
      <h1 class="registration-title">Регистрация</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <UiInput v-model="name" placeholder="Имя"> Имя (необязательно) </UiInput>

        <UiInput v-model="email" placeholder="Email"> Email </UiInput>

        <UiInput v-model="password" placeholder="Пароль" type="password"> Пароль </UiInput>

        <UiInput v-model="confirmPassword" placeholder="Подтвердите пароль" type="password">
          Подтвердите пароль
        </UiInput>

        <div v-if="validationError" class="error-message">
          {{ validationError }}
        </div>

        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <UiButton
          type="submit"
          :loading="authStore.isLoading"
          :disabled="!isFormValid"
          class="submit-button"
        >
          Зарегистрироваться
        </UiButton>

        <div class="login-link">
          Уже есть аккаунт?
          <router-link to="/login">Войти</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UiInput from '@/components/UiInput.vue';
import UiButton from '@/components/UiButton.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const validationError = ref('');

const isFormValid = computed(() => {
  return !!email.value && !!password.value && !!confirmPassword.value;
});

const validateForm = (): boolean => {
  validationError.value = '';

  if (!email.value || !password.value || !confirmPassword.value) {
    validationError.value = 'Все поля обязательны для заполнения';
    return false;
  }

  if (password.value.length < 6) {
    validationError.value = 'Пароль должен содержать минимум 6 символов';
    return false;
  }

  if (password.value !== confirmPassword.value) {
    validationError.value = 'Пароли не совпадают';
    return false;
  }

  // Простая валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    validationError.value = 'Введите корректный email';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  const result = await authStore.register(email.value, password.value, name.value || undefined);

  if (result.success) {
    router.push({ name: 'home' });
  }
};
</script>

<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.registration-form {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.registration-title {
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

.login-link {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
