<template>
  <tbody v-if="rows && rows.length > 0">
    <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)" class="ui-table__tr">
      <td
        v-for="(column, colIndex) in columns"
        :key="column.key"
        :class="['ui-table__td', column.class, column.align ? `is-${column.align}` : undefined]"
      >
        <slot
          :name="`cell-${column.key}`"
          :row="row"
          :value="(row as any)[column.key]"
          :rowIndex="rowIndex"
          :colIndex="colIndex"
          :field="column.key"
          :column="column"
        >
          {{ formatCell((row as any)[column.key]) }}
        </slot>
      </td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td class="ui-table__td ui-table__td--empty" :colspan="columns.length">
        <slot name="empty">Нет данных</slot>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
type ColumnAlign = 'left' | 'center' | 'right';

interface ColumnObject {
  key: string;
  label?: string;
  class?: string;
  align?: ColumnAlign;
}

interface Props {
  rows: Array<Record<string, unknown>>;
  columns: ColumnObject[];
  rowKey?: string | ((row: Record<string, unknown>, index: number) => string | number);
}

const props = defineProps<Props>();

function getRowKey(row: Record<string, unknown>, index: number): string | number {
  const rk = props.rowKey;
  if (!rk) return index;
  if (typeof rk === 'function') return rk(row, index);
  const value = row[rk];
  return typeof value === 'string' || typeof value === 'number' ? value : index;
}

function formatCell(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
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

.ui-table__td.is-center {
  text-align: center;
}

.ui-table__td.is-right {
  text-align: right;
}

.ui-table__td--empty {
  text-align: center;
  color: #6b7280;
}
</style>
