<template>
  <div class="ui-select" @click="toggleDropdown">
    <div class="ui-select__value">
      <template v-if="isMultiple">
        <span v-for="(item, index) in modelValue" :key="index" class="ui-select__tag">
          {{ getLabel(item) }}
        </span>
      </template>
      <template v-else>
        {{ getLabel(modelValue) || 'Выберите...' }}
      </template>
    </div>

    <div v-if="isOpen" class="ui-select__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        @click.stop="selectOption(option.value)"
        class="ui-select__option"
        :class="{ selected: isSelected(option.value) }"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
interface Option {
  label: string;
  value: string | number;
}

type Value = string | number | Array<string | number> | null;

interface Props {
  options: Option[];
  modelValue: Value;
  mode?: 'single' | 'multiple';
}

interface Emit {
  (e: 'update:modelValue', value: Value): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const isMultiple = computed(() => props.mode === 'multiple');

const selectOption = (value) => {
  if (isMultiple.value) {
    const newValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = newValue.indexOf(value);
    if (index >= 0) {
      newValue.splice(index, 1);
    } else {
      newValue.push(value);
    }
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', value);
    isOpen.value = false;
  }
};

const isSelected = (value) => {
  return isMultiple.value ? props.modelValue?.includes(value) : props.modelValue === value;
};

const getLabel = (value) => {
  const found = props.options.find((opt) => opt.value === value);
  return found?.label || '';
};
</script>

<style scoped>
.ui-select {
  border: 1px solid #ccc;
  padding: 8px;
  width: 200px;
  position: relative;
  cursor: pointer;
  background: white;
}

.ui-select__value {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.ui-select__tag {
  background: #eee;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.ui-select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ddd;
  background: white;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.ui-select__option {
  padding: 6px 10px;
}

.ui-select__option.selected {
  background: #f0f0f0;
  font-weight: bold;
}
</style>
