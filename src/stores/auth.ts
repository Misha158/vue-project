import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
}

interface RegisterResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
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
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { access_token, user: userData } = response.data;

      // Сохраняем данные пользователя
      const authUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      };

      user.value = authUser;
      token.value = access_token;

      // Сохраняем в localStorage
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(authUser));

      return { success: true };
    } catch (err: any) {
      // Обработка ошибок от API
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          error.value = 'Неверный email или пароль';
        } else if (err.response?.data?.message) {
          // Обработка ошибок валидации
          const messages = Array.isArray(err.response.data.message)
            ? err.response.data.message.join(', ')
            : err.response.data.message;
          error.value = messages;
        } else {
          error.value = 'Ошибка при входе. Проверьте подключение к серверу.';
        }
      } else {
        error.value = err instanceof Error ? err.message : 'Ошибка при входе';
      }
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    isLoading.value = true;
    error.value = null;

    // Валидация
    if (!email || !password) {
      error.value = 'Email и пароль обязательны';
      isLoading.value = false;
      return { success: false, error: error.value };
    }

    if (!name || name.length < 2) {
      error.value = 'Имя обязательно и должно содержать минимум 2 символа';
      isLoading.value = false;
      return { success: false, error: error.value };
    }

    if (password.length < 6) {
      error.value = 'Пароль должен содержать минимум 6 символов';
      isLoading.value = false;
      return { success: false, error: error.value };
    }

    try {
      const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        name,
      });

      const { access_token, user: userData } = response.data;

      // Сохраняем данные пользователя
      const authUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      };

      user.value = authUser;
      token.value = access_token;

      // Сохраняем в localStorage
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(authUser));

      return { success: true };
    } catch (err: any) {
      // Обработка ошибок от API
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          error.value = 'Пользователь с таким email уже существует';
        } else if (err.response?.data?.message) {
          // Обработка ошибок валидации
          const messages = Array.isArray(err.response.data.message)
            ? err.response.data.message.join(', ')
            : err.response.data.message;
          error.value = messages;
        } else {
          error.value = 'Ошибка при регистрации. Проверьте подключение к серверу.';
        }
      } else {
        error.value = err instanceof Error ? err.message : 'Ошибка при регистрации';
      }
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
    register,
    logout,
    initializeAuth,
  };
});
