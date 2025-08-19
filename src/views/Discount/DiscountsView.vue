<template>
  <div>
    <UiTable :data="supplierDiscounts" :columns="columns">
      <!--      <template #originPrice>-->
      <!--        <div>Origin price is 9999</div>-->
      <!--      </template>-->
    </UiTable>
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

const supplierDiscounts = [
  {
    id: 1,
    originPrice: 212.5,
    supplierName: 'Acme Corp',
    discount: 15,
    discountedPrice: null,
  },
  {
    id: 2,
    supplierName: 'Globex',
    originPrice: 212.5,
    discount: 20,
    discountedPrice: null,
  },
  {
    id: 3,
    originPrice: 212.5,
    supplierName: 'Soylent',
    discount: 10,
    discountedPrice: null,
  },
];

const columns = [
  {
    key: 'supplierName',
    label: 'Supplier name',
  },
  {
    key: 'originPrice',
    label: 'Origin price',
  },
  {
    key: 'discount',
    label: 'Discount, %',
  },
  {
    key: 'discountedPrice',
    label: 'Price after discount',
  },
  {
    key: 'action',
    label: 'Action',
  },
];

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
