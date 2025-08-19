<template>
  <tbody>
    <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="ui-table__tr">
      <td v-for="(column, colIndex) in columns" :key="column.key" class="ui-table__td">
        <slot v-if="column.slotName" :name="column.slotName" :row="row"> </slot>
        <div v-else>
          {{ formatCell(row[column.key]) }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import type { Column } from '@/types/ui-table.ts';

interface Props {
  data: Array<Record<string, unknown>>;
  columns: Column[];
}

const props = defineProps<Props>();

const formatCell = (value: any) => {
  if (value === null) return '-';
  return value;
};
</script>

<style scoped>
.ui-table__tr:nth-child(even) .ui-table__td {
  background: #fcfcfd;
}

.ui-table__td {
  padding: 10px 12px;
  font-size: 14px;
  color: #111827;
  border-bottom: 1px solid #f0f0f0;
}

.ui-table__td--empty {
  text-align: center;
  color: #6b7280;
}
</style>
