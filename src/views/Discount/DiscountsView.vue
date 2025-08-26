<template>
  <div>
    <UiTable :data="data" :columns="columns">
      <template #discount="{ row }">
        <div>Discount is 9999 - real discount {{ row.discount }}</div>
      </template>

      <template #action="{ row }">
        <UiButton @click="onEdit">Edit</UiButton>
      </template>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import UiTable from '@/components/ui-table/UiTable.vue';
import UiButton from '@/components/UiButton.vue';

type SupplierRow = {
  id: string | number;
  supplierName: string;
  discount: number; // в процентах, например 15 = 15%
  price: number; // исходная цена
};

defineProps<{
  columns: SupplierRow[];
  data: SupplierRow[];
}>();

defineEmits<{
  (e: 'edit', row: SupplierRow): void;
}>();

const onEdit = () => {
  return;
};
</script>

<style scoped>
table {
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    'Apple Color Emoji',
    'Segoe UI Emoji';
}
th,
td {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
