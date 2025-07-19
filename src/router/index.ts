import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MySidebar from '@/components/sidebar/MySidebar.vue';
import MainLayout from '@/layout/MainLayout.vue';

export enum RouterType {
  SIDEBAR = 'sidebar',
  HOME = 'home',
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
      ],
    },
  ],
});

export default router;
