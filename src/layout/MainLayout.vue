<template>
  <div>
    <header class="bg-[#535b75] h-[80px]">
      <div>
        <img src="@/assets/images/maclogo.png" alt="" width="60" height="70" class="pt-2 ml-10" />
      </div>
    </header>
    <div class="flex">
      <MySidebar class="!mt-[80px]" />
      <router-view class="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MySidebar from '@/components/sidebar/MySidebar.vue';
</script>

<style scoped lang="scss">
$SIDEBAR_WIDTH: 220px;

.content {
  margin-left: calc($SIDEBAR_WIDTH + 20px);
  padding: 20px;
  width: 100%;
}
</style>
