import SendGiftFormLayout from '@/views/send-gift/SendGiftFormLayout.vue';
import SendGiftDetailsStep from '@/views/send-gift/SendGiftDetailsStep.vue';
import SendGiftTagsStep from '@/views/send-gift/SendGiftTagsStep.vue';
import SendGiftRecipientsStep from '@/views/send-gift/SendGiftRecipientsStep.vue';
import SendGiftSummaryStep from '@/views/send-gift/SendGiftSummaryStep.vue';
import { RouterType } from '@/consts/route.ts';

export const sendGiftRoutes = {
  path: '/send-a-gift-form',
  name: 'send-gift-form',
  component: SendGiftFormLayout,
  meta: { requiresAuth: true },
  children: [
    {
      path: 'step-1-details',
      name: RouterType.SEND_GIFT_DETAILS,
      component: SendGiftDetailsStep,
      meta: { requiresAuth: true },
    },
    {
      path: 'step-2-tags',
      name: RouterType.SEND_GIFT_TAGS,
      component: SendGiftTagsStep,
      meta: { requiresAuth: true },
    },
    {
      path: 'step-3-recipients',
      name: RouterType.SEND_GIFT_RECIPIENTS,
      component: SendGiftRecipientsStep,
      meta: { requiresAuth: true },
    },
    {
      path: 'step-4-summary',
      name: RouterType.SEND_GIFT_SUMMARY,
      component: SendGiftSummaryStep,
      meta: { requiresAuth: true },
    },
  ],
};
