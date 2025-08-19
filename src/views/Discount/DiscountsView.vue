<template>
  <div>
    <UiTable rows="" />
  </div>
</template>

<script setup lang="ts">
import UiTable from '@/components/ui-table/UiTable.vue';

type SupplierRow = {
  id: string | number;
  supplierName: string;
  discount: number; // в процентах, например 15 = 15%
  price: number; // исходная цена
};

defineProps<{
  rows: SupplierRow[];
}>();

defineEmits<{
  (e: 'edit', row: SupplierRow): void;
}>();

const priceAfterDiscount = (price: number, discount: number) =>
  Math.max(0, price * (1 - (Number(discount) || 0) / 100));

const toMoney = (v: number) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v);

const toPercent = (v: number) => `${(Number(v) || 0).toFixed(0)}%`;
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
