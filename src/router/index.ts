import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MainLayout from '@/layout/MainLayout.vue';
import SendGiftView from '@/views/send-gift/SendGiftView.vue';
import BudgetLinkView from '@/views/BudgetLinkView.vue';
import DiscountsParentView from '@/views/Discount/DiscountsParentView.vue';
import { sendGiftRoutes } from '@/router/sendGifts.ts';
import { RouterType } from '@/consts/route.ts';
import StripeView from '@/views/StripeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import LoginView from '@/views/LoginView.vue';
import RegistrationView from '@/views/RegistrationView.vue';
import SlackView from '@/views/SlackView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: RouterType.LOGIN,
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/registration',
      name: RouterType.REGISTRATION,
      component: RegistrationView,
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      name: '',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'home',
          name: RouterType.HOME,
          component: HomeView,
          meta: { requiresAuth: true },
        },
        {
          path: 'send-a-gift',
          name: RouterType.SEND_GIFT,
          component: SendGiftView,
          meta: { requiresAuth: true },
        },
        { 
          path: '/budget-link', 
          name: RouterType.BUDGET_LINK, 
          component: BudgetLinkView,
          meta: { requiresAuth: true },
        },
        {
          path: '/discount-suppliers',
          name: RouterType.DISCOUNT_SUPPLIERS,
          component: DiscountsParentView,
          meta: { requiresAuth: true },
        },

        {
          path: '/stripe',
          name: RouterType.STRIPE,
          component: StripeView,
          meta: { requiresAuth: true },
        },

        {
          path: '/settings',
          name: RouterType.SETTINGS,
          component: SettingsView,
          meta: { requiresAuth: true },
        },

        {
          path: '/slack',
          name: RouterType.SLACK,
          component: SlackView,
          meta: { requiresAuth: true },
        },
      ],
    },
    sendGiftRoutes,
  ],
});

// Навигационные хуки для проверки авторизации
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Если маршрут требует авторизации
  if (to.meta.requiresAuth) {
    // Проверяем, авторизован ли пользователь
    if (!authStore.isAuthenticated) {
      // Если токен есть в localStorage, пытаемся его проверить
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        // Проверяем токен
        const isValid = await authStore.verifyToken(storedToken);
        if (isValid) {
          // Восстанавливаем состояние из localStorage
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              authStore.user.value = JSON.parse(storedUser);
              authStore.token.value = storedToken;
            } catch {
              // Если не удалось восстановить, перенаправляем на логин
              next({ name: RouterType.LOGIN });
              return;
            }
          }
        } else {
          // Токен невалиден, перенаправляем на логин
          next({ name: RouterType.LOGIN });
          return;
        }
      } else {
        // Токена нет, перенаправляем на логин
        next({ name: RouterType.LOGIN });
        return;
      }
    }
  }

  // Если маршрут требует, чтобы пользователь был неавторизован (login, registration)
  if (to.meta.requiresGuest) {
    if (authStore.isAuthenticated) {
      // Пользователь уже авторизован, перенаправляем на главную
      next({ name: RouterType.HOME });
      return;
    }
  }

  next();
});

export default router;
