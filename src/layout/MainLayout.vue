<template>
  <div class="flex">
    <MySidebar />
    <router-view class="content" />
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
