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
  children: [
    {
      path: 'step-1-details',
      name: RouterType.SEND_GIFT_DETAILS,
      component: SendGiftDetailsStep,
    },
    {
      path: 'step-2-tags',
      name: RouterType.SEND_GIFT_TAGS,
      component: SendGiftTagsStep,
    },
    {
      path: 'step-3-recipients',
      name: RouterType.SEND_GIFT_RECIPIENTS,
      component: SendGiftRecipientsStep,
    },
    {
      path: 'step-4-summary',
      name: RouterType.SEND_GIFT_SUMMARY,
      component: SendGiftSummaryStep,
    },
  ],
};
