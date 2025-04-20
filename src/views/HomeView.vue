<script setup lang="ts">
import { ref } from 'vue';
import UiModal from '@/ui-components/UiModal.vue';
import UiDropdown from '@/ui-components/UiDropdown/UiDropdown.vue';
import InfinityScroll from '@/features/InfinityScroll.vue';

const isOpen = ref<boolean>(false);
</script>

<template>
  <main>
    <div>
      <InfinityScroll />
    </div>
  </main>
</template>
