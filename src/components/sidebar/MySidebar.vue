<template>
  <aside class="sidebar">
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

const links = [
  { label: 'Главная', href: '/home', icon: IconHome },
  { label: 'Контакты', href: '/contact', icon: IconContacts },
];
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
