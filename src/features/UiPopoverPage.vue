<template>
  <div class="m">
    <UiPopover :position="'bottom'">
      <template #trigger>
        <button
          class="border border-black py-2 px-5 rounded-2xl hover:bg-amber-200 active:bg-amber-400 transition cursor-pointer"
        >
          Save user
        </button>
      </template>

      <template #popover>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
        <div>Explanation information</div>
      </template>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
import UiPopover from '@/ui-components/UiPopover.vue';
</script>

<style scoped></style>
