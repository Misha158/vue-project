<template>
  <div>
    <DiscountsView :columns="columns" :data="supplierDiscounts" />
  </div>
</template>

<script setup lang="ts">
import DiscountsView from '@/views/Discount/DiscountsView.vue';

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
    slotName: 'discount',
  },
  {
    key: 'discountedPrice',
    label: 'Price after discount',
  },
  {
    key: 'action',
    label: 'Action',
    slotName: 'action',
  },
];

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
