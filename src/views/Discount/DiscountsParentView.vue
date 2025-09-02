<template>
  <div>
    <DiscountsView
      :columns="columns"
      :data="supplierDiscounts"
      @save="onSave"
      @saveAll="onSaveAll"
    />
  </div>
</template>

<script setup lang="ts">
import DiscountsView from '@/views/Discount/DiscountsView.vue';
import { ref } from 'vue';

const supplierDiscounts = ref([
  {
    id: 1,
    originPrice: 212.5,
    supplierName: 'Acme Corp',
    discount: 15,
    cost: 212.5,
    discountedPrice: null,
  },
  {
    id: 2,
    supplierName: 'Globex',
    originPrice: 212.5,
    discount: 20,
    cost: 212.5,
    discountedPrice: null,
  },
  {
    id: 3,
    originPrice: 212.5,
    supplierName: 'Soylent',
    discount: 10,
    cost: 212.5,
    discountedPrice: null,
  },
]);

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
    key: 'cost',
    label: 'Price after discount',
    slotName: 'cost',
  },
  {
    key: 'action',
    label: 'Action',
    slotName: 'action',
  },
];

const onSave = (editedRow) => {
  supplierDiscounts.value = supplierDiscounts.value.map((discount) => {
    if (discount.id === editedRow.id) {
      return editedRow;
    }

    return discount;
  });
};

const onSaveAll = (editedRows) => {
  supplierDiscounts.value = editedRows;
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
