<template>
  <div>
    <div>
      <UiButton class="flex ms-auto mb-20">Create</UiButton>

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

interface Item {
  imageUrl: string;
  title: string;
  subTitle: string;
  recipientIds: number[];
  tags: string[];
}

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

const handleEdit = () => {
  return;
};
</script>

<style scoped></style>
