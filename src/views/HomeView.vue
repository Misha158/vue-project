<template>
  <main>
    <!--    <UiPopoverPage />-->
    <UiCheckbox v-model="value"> Is agree </UiCheckbox>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UiPopoverPage from '@/features/UiPopoverPage.vue';
import UiCheckbox from '@/components/UiCheckbox.vue';

const value = ref(true);
</script>
