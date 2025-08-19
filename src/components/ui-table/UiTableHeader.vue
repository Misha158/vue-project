<template>
  <thead>
    <tr>
      <th v-for="column in columns" :key="column.key" class="ui-table__th">
        {{ column.label ?? column.key }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { Column } from '@/types/ui-table.ts';

interface Props {
  columns: Column[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.ui-table__th {
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
</style>
