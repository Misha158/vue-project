<template>
  <div>
    <!--    <input v-model="name" type="text" />-->
    <input v-model="model" type="text" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// const name = defineModel();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>

<style scoped></style>
