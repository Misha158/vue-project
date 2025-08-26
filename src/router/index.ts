import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MainLayout from '@/layout/MainLayout.vue';
import SendGiftView from '@/views/send-gift/SendGiftView.vue';
import BudgetLinkView from '@/views/BudgetLinkView.vue';
import DiscountsParentView from '@/views/Discount/DiscountsParentView.vue';
import { sendGiftRoutes } from '@/router/sendGifts.ts';
import { RouterType } from '@/consts/route.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      ],
    },
    sendGiftRoutes,
  ],
});

export default router;
