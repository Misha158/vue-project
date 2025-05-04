<template>
  <div class="m-10">
    <UiPopover :position="'right'">
      <template #trigger>
        <button
          class="border border-black py-2 px-5 rounded-2xl hover:bg-amber-200 active:bg-amber-400 transition cursor-pointer"
        >
          Save user
        </button>
        <!--        <div class="arrow"></div>-->
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

<!--<style scoped>-->
<!--//.arrow {-->
<!--//  width: 0;-->
<!--//  height: 0;-->
<!--//  border-bottom: 10px solid black;-->
<!--//  border-top: none;-->
<!--//  border-left: 10px solid transparent;-->
<!--//  border-right: 10px solid transparent;-->
<!--//}-->
<!--</style>-->
