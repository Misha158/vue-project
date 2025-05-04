<template>
  <div>
    <UiPopover :position="'bottom'">
      <button
        class="border border-black py-2 px-5 rounded-2xl hover:bg-amber-200 active:bg-amber-400 transition cursor-pointer"
      >
        Save user
      </button>

      <template #popover> Explanation information </template>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
import UiPopover from '@/ui-components/UiPopover.vue';
</script>

<style scoped></style>
