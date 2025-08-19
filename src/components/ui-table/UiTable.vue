<template>
  <div class="ui-table-wrapper">
    <table class="ui-table">
      <UiTableHeader :columns="normalizedColumns">
        <template v-for="column in normalizedColumns" #[`header-${column.key}`]="slotProps">
          <slot :name="`header-${column.key}`" v-bind="slotProps" />
        </template>
      </UiTableHeader>
      <UiTableBody :rows="rows" :columns="normalizedColumns" :rowKey="rowKey">
        <template v-for="column in normalizedColumns" #[`cell-${column.key}`]="slotProps">
          <slot :name="`cell-${column.key}`" v-bind="slotProps" />
        </template>
        <template #empty>
          <slot name="empty">Нет данных</slot>
        </template>
      </UiTableBody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiTableHeader from './UiTableHeader.vue';
import UiTableBody from './UiTableBody.vue';

type ColumnAlign = 'left' | 'center' | 'right';

interface ColumnObject {
  key: string;
  label?: string;
  class?: string;
  headerClass?: string;
  width?: string;
  align?: ColumnAlign;
}

type Column = string | ColumnObject;

interface Props<Row extends Record<string, unknown>> {
  rows: Row[];
  columns?: Column[];
  rowKey?: keyof Row | ((row: Row, index: number) => string | number);
}

const props = defineProps<Props<Record<string, unknown>>>();

const normalizedColumns = computed<ColumnObject[]>(() => {
  if (props.columns && props.columns.length > 0) {
    return props.columns.map((c) =>
      typeof c === 'string'
        ? { key: c, label: c }
        : {
            key: c.key,
            label: c.label ?? c.key,
            class: c.class,
            headerClass: c.headerClass,
            width: c.width,
            align: c.align,
          },
    );
  }
  const firstRow = props.rows?.[0] ?? {};
  return Object.keys(firstRow).map((key) => ({ key, label: key }));
});

// Presentation helpers moved to UiTableBody
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

/* Body and header styles live in dedicated components */
</style>
