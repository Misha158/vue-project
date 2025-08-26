<template>
  <div>
    <div>
      <UiButton
        class="flex ms-auto mb-20"
        @click="$router.push({ name: RouterType.SEND_GIFT_DETAILS })"
      >
        Create
      </UiButton>

      <div class="grid gap-4">
        <SendGiftItem v-for="(item, index) in items" :key="index" :item="item" @edit="handleEdit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/UiButton.vue';
import { ref } from 'vue';
import SendGiftItem from '@/components/send-gift/SendGiftItem.vue';
import { RouterType } from '@/consts/route.ts';
import { useRouter } from 'vue-router';
import { useSendGiftStore } from '@/stores/send-a-gift.ts';
import { storeToRefs } from 'pinia';
import { saveSendGiftToLC } from '@/services/sendGifts.ts';

interface Item {
  imageUrl: string;
  title: string;
  subTitle: string;
  recipientIds: number[];
  tags: string[];
}

const sendGiftStore = useSendGiftStore();
const { formData } = storeToRefs(sendGiftStore);

const router = useRouter();

const defaultItems: Item[] = [
  {
    imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    title: 'Birthday Gift',
    subTitle: 'For Anna’s Birthday',
    recipientIds: [1, 2],
    tags: ['Birthday', 'Special'],
  },
  {
    imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    title: 'Anniversary Surprise',
    subTitle: 'Celebrating 2 years',
    recipientIds: [3],
    tags: ['Love', 'Surprise'],
  },
  {
    imageUrl: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
    title: 'Thank You Gift',
    subTitle: 'Appreciation for help',
    recipientIds: [],
    tags: ['Thanks'],
  },
];

const items = ref<Item[]>(defaultItems);

const fetchSendGiftMock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        details: 'mock details',
        tag: 'food',
        recipients: ['food'],
      });
    }, 500); // эмуляция задержки 0.5 сек
  });
};

const handleEdit = async () => {
  const result = await fetchSendGiftMock();
  Object.assign(formData.value, result);

  saveSendGiftToLC({ currentStep: 1, formData: formData.value });

  router.push({ name: RouterType.SEND_GIFT_DETAILS, query: { mode: 'edit' } });
};
</script>

<style scoped></style>
