import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  name?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value && !!token.value);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    // Валидация
    if (!email || !password) {
      error.value = 'Email и пароль обязательны';
      isLoading.value = false;
      return { success: false, error: error.value };
    }

    try {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Временная имитация API (password используется в реальном API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Временные данные для демонстрации
      const mockUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      user.value = mockUser;
      token.value = mockToken;

      // Сохраняем в localStorage
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      return { success: true };
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка при входе';
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  };

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      token.value = storedToken;
      try {
        user.value = JSON.parse(storedUser);
      } catch {
        logout();
      }
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  };
});
