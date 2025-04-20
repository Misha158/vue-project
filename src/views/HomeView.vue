<script setup lang="ts">
import { ref } from 'vue';
import UiModal from '@/ui-components/UiModal.vue';
import UiDropdown from '@/ui-components/UiDropdown/UiDropdown.vue';

const isOpen = ref<boolean>(false);
</script>

<template>
  <main>
    <div>
      <button @click="isOpen = true">Open modal</button>

      <UiModal v-if="isOpen" @close="isOpen = false">
        <div class="w-[500px]">
          <header class="mb-5">Header</header>
          <div>Content</div>
          <ui-dropdown class="my-5" :options="['1', '2', '3']" />
        </div>
      </UiModal>
    </div>
  </main>
</template>
