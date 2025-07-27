import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MySidebar from '@/components/sidebar/MySidebar.vue';
import MainLayout from '@/layout/MainLayout.vue';
import SendGiftView from '@/views/send-gift/SendGiftView.vue';
import SendGiftFormLayout from '@/views/send-gift/SendGiftFormLayout.vue';
import SendGiftDetailsStep from '@/views/send-gift/SendGiftDetailsStep.vue';
import SendGiftRecipientsStep from '@/views/send-gift/SendGiftRecipientsStep.vue';
import SendGiftTagsStep from '@/views/send-gift/SendGiftTagsStep.vue';

export enum RouterType {
  SIDEBAR = 'sidebar',
  HOME = 'home',
  SEND_GIFT = 'send-gift',
  SEND_GIFT_DETAILS = 'send-gift-details',
  SEND_GIFT_RECIPIENTS = 'send-gift-recipients',
  SEND_GIFT_TAGS = 'send-gift-tags',
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
    {
      path: '/send-a-gift-form',
      name: 'send-gift-form',
      component: SendGiftFormLayout,
      children: [
        {
          path: 'step-1',
          name: RouterType.SEND_GIFT_DETAILS,
          component: SendGiftDetailsStep,
        },
        {
          path: 'step-2',
          name: RouterType.SEND_GIFT_TAGS,
          component: SendGiftTagsStep,
        },
        {
          path: 'step-3',
          name: RouterType.SEND_GIFT_RECIPIENTS,
          component: SendGiftRecipientsStep,
        },
      ],
    },
  ],
});

export default router;
