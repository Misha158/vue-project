<template>
  <label class="ui-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox-custom" />
    <span class="label-text">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

interface Emit {
  (e: 'update:modelValue', value: boolean): void;
}

defineProps<Props>();
defineEmits<Emit>();
</script>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

input[type='checkbox'] {
  display: none;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

input[type='checkbox']:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0px;
  width: 4px;
  height: 8px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
