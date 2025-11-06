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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: RouterType.LOGIN,
      component: LoginView,
    },
    {
      path: '/registration',
      name: RouterType.REGISTRATION,
      component: RegistrationView,
    },
    {
      path: '/',
      name: '',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: RouterType.HOME,
          component: HomeView,
        },
        {
          path: 'send-a-gift',
          name: RouterType.SEND_GIFT,
          component: SendGiftView,
        },
        { path: '/budget-link', name: RouterType.BUDGET_LINK, component: BudgetLinkView },
        {
          path: '/discount-suppliers',
          name: RouterType.DISCOUNT_SUPPLIERS,
          component: DiscountsParentView,
        },

        {
          path: '/stripe',
          name: RouterType.STRIPE,
          component: StripeView,
        },

        {
          path: '/settings',
          name: RouterType.SETTINGS,
          component: SettingsView,
        },
      ],
    },
    sendGiftRoutes,
  ],
});

export default router;
