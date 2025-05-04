<template>
  <div class="m">
    <UiPopover :position="'right'">
      <template #popover>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
      </template>

      <button
        class="border border-black py-2 px-5 rounded-2xl hover:bg-amber-200 active:bg-amber-400 transition cursor-pointer"
      >
        Save user
      </button>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
import UiPopover from '@/ui-components/UiPopover.vue';
</script>

<style scoped></style>
