<template>
  <div>
    <div class="mb-5">
      <UiButton @click="onBulkEdit" class="me-5">Bulk edit</UiButton>
      <UiButton @click="onBulkSave">Bulk Save</UiButton>
    </div>
    <UiTable :data="data" :columns="columns">
      <template #discount="{ row }">
        <div v-if="editingRows[row.id]">
          <input
            type="number"
            v-model="editingRows[row.id].discount"
            class="border px-2 py-1 w-20"
          />
        </div>
        <div v-else>{{ row.discount }}</div>
      </template>

      <template #action="{ row }">
        <UiButton v-if="!editingRows[row.id]" @click="onEdit(row)"> Edit </UiButton>
        <UiButton v-else @click="onSave(row)"> Save </UiButton>
        <UiButton v-if="editingRows[row.id]" @click="onCancel(row)" class="ml-2"> Cancel </UiButton>
      </template>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import UiTable from '@/components/ui-table/UiTable.vue';
import UiButton from '@/components/UiButton.vue';
import { reactive } from 'vue';

type SupplierRow = {
  id: string | number;
  supplierName: string;
  discount: number; // в процентах, например 15 = 15%
  price: number; // исходная цена
};

const props = defineProps<{
  columns: SupplierRow[];
  data: SupplierRow[];
}>();

const emit = defineEmits<{
  (e: 'save', row: SupplierRow): void;
  (e: 'saveAll', rows: SupplierRow[]): void;
}>();

// словарь редактируемых строк
const editingRows: Record<string | number, SupplierRow> = reactive({});

const onEdit = (row: SupplierRow) => {
  // создаем копию строки в словаре редактируемых
  editingRows[row.id] = { ...row };
};

const onSave = (row: SupplierRow) => {
  emit('save', editingRows[row.id]);
  delete editingRows[row.id]; // выйти из режима редактирования
};

const onCancel = (row: SupplierRow) => {
  delete editingRows[row.id]; // просто выкидываем изменения
};

const onBulkEdit = () => {
  const result = props.data.reduce((acc, item) => {
    return { ...acc, [item.id]: item };
  }, {});

  console.log({ result });
  Object.assign(editingRows, result);
};

const onBulkSave = () => {
  const rows = Object.values(editingRows);
  emit('saveAll', rows);
  Object.keys(editingRows).forEach((key) => delete editingRows[key]); // очистка
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
