<template>
  <label class="ui-input">
    <span class="label-text">
      <slot />
    </span>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

interface Emit {
  (e: 'update:modelValue', value: string): void;
}

defineEmits<Emit>();
</script>

<style scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 12px;
}

.label-text {
  margin-bottom: 4px;
  color: #333;
}

.ui-input input {
  padding: 8px 12px;
  border: 2px solid #333;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.ui-input input:focus {
  border-color: #007bff;
}
</style>
