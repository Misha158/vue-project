<template>
  <div class="flex justify-between items-center gap-4 p-4 border rounded shadow-sm">
    <div class="flex items-center gap-4 p-4">
      <img :src="item.imageUrl" alt="Item image" class="w-16 h-16 object-cover rounded" />
      <div class="flex flex-col">
        <h2 class="font-semibold text-lg">{{ item.title }}</h2>
        <p class="text-gray-500 text-sm">{{ item.subTitle }}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
    <UiButton @click="$emit('edit', item)">Edit</UiButton>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import UiButton from '@/components/UiButton.vue';

interface Item {
  imageUrl: string;
  title: string;
  subTitle: string;
  recipientIds: number[];
  tags: string[];
}

defineProps<{
  item: Item;
}>();

defineEmits<{
  (e: 'edit', item: Item): void;
}>();
</script>
