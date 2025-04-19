<script setup lang="ts">
import UiDropdown from '@/ui-components/UiDropdown/UiDropdown.vue'
</script>

<template>
  <main>
    <div>
      <div class="overflow-x-auto text-black max-w-[400px] bg-amber-200 flex justify-between gap-2">
        <UiDropdown class="w-[100px]" :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']" />
        <div>item-1</div>
        <div>item-2</div>
        <div>item-3</div>
        <div>item-4</div>
        <div>item-5</div>
        <div>item-5</div>
        <div>item-5</div>
        <div>item-5</div>
        <div>item-5</div>
      </div>
    </div>

    <UiDropdown class="m-20" :options="['1', '2', '3', '4', '5', '6', '7', '8', '9']" />
  </main>
</template>
