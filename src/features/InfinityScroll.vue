<template>
  <div>
    <div v-for="todo in items" :key="todo.id" class="p-2 mb-2 text-black bg-amber-200 rounded-lg">
      <span class="me-1"> {{ todo.id }}. </span>
      <span>{{ todo.title }}</span>
    </div>
    <!-- Наблюдаем за этим элементом -->
    <div ref="lastElement" class="h-[1px]" />
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';

const { items, lastElement } = useInfiniteScroll({
  url: 'https://jsonplaceholder.typicode.com/photos',
  limit: 20,
});
</script>
