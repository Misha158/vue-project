<template>
  <thead>
    <tr>
      <th
        v-for="(column, colIndex) in columns"
        :key="column.key"
        :class="['ui-table__th', column.headerClass]"
        :style="column.width ? { width: column.width } : undefined"
      >
        <slot :name="`header-${column.key}`" :column="column" :colIndex="colIndex">
          {{ column.label ?? column.key }}
        </slot>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
interface ColumnObject {
  key: string;
  label?: string;
  headerClass?: string;
  width?: string;
}

defineProps<{ columns: ColumnObject[] }>();
</script>

<style scoped>
thead th.ui-table__th {
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
</style>
