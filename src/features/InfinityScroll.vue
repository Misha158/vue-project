<template>
  <div>
    <div v-for="todo in photos" :key="todo.id" class="p-2 mb-2 text-black bg-amber-200 rounded-lg">
      <span class="me-1"> {{ todo.id }}. </span>
      <span>{{ todo.title }}</span>
    </div>
    <!-- Наблюдаем за этим элементом -->
    <div ref="lastElement" class="h-[1px]" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const photos = ref<any[]>([]);
const lastElement = ref<HTMLElement | null>(null);
const limit = 20;
let start = 0;
let loading = false;
let allLoaded = false;

const loadMore = async () => {
  if (loading || allLoaded) return;
  loading = true;

  const res = await axios.get('https://jsonplaceholder.typicode.com/photos', {
    params: {
      _start: start,
      _limit: limit,
    },
  });

  if (res.data.length < limit) {
    allLoaded = true; // если меньше лимита — всё загружено
  }

  photos.value.push(...res.data);
  start += limit;
  loading = false;
};

const setupObserver = () => {
  if (!lastElement.value) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });

  observer.observe(lastElement.value);
};

onMounted(() => {
  loadMore();
  setupObserver();
});
</script>

<style scoped></style>
