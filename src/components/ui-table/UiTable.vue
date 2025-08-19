<template>
  <div class="ui-table-wrapper">
    <table class="ui-table">
      <UiTableHeader :columns="columns" />
      <UiTableBody :data="data" :columns="columns">
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps" />
        </template>
      </UiTableBody>
    </table>
  </div>
</template>

<script setup lang="ts">
import UiTableHeader from '@/components/ui-table/UiTableHeader.vue';
import type { Column } from '@/types/ui-table.ts';
import UiTableBody from '@/components/ui-table/UiTableBody.vue';

interface Props {
  data: Array<Record<string, unknown>>;
  columns: Column[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.ui-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.ui-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
</style>
