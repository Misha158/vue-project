import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MySidebar from '@/components/sidebar/MySidebar.vue';
import MainLayout from '@/layout/MainLayout.vue';
import SendGiftView from "@/views/SendGiftView.vue";

export enum RouterType {
  SIDEBAR = 'sidebar',
  HOME = 'home',
  SEND_GIFT = 'send-gift',
}

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
      ],
    },
  ],
});

export default router;
