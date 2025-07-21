<template>
  <aside class="sidebar">
    <div
      @click="isCollapsed = !isCollapsed"
      class="absolute top-2 left-[205px] cursor-pointer p-1 rounded-full bg-gray-200 transition hover:bg-gray-300"
    >
      <IconArrow
        class="w-[25px] h-[25px] stroke-pink-500 rotate-180"
        :class="{
          '!rotate-0 transition': isCollapsed,
        }"
      />
    </div>
    <nav class="menu">
      <RouterLink v-for="item in links" :key="item.href" :to="item.href" class="menu-item">
        <component :is="item.icon" class="icon" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import IconHome from '@/components/icons/IconHome.vue';
import IconContacts from '@/components/icons/IconContacts.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import { ref } from 'vue';

const links = [
  { label: 'Главная', href: '/home', icon: IconHome },
  { label: 'Контакты', href: '/contact', icon: IconContacts },
];

const isCollapsed = ref(false);
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background-color: #1f2937;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.2s;
}

.menu-item:hover {
  color: #60a5fa;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
