<template>
  <div>
    <!--    <ChildComponent v-model="name" />-->
    <ChildComponent v-model="model" />
  </div>
</template>

<script setup lang="ts">
import ChildComponent from '@/features/defineModel/ChildComponent.vue';
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
