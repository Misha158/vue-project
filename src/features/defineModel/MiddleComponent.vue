<template>
  <div>
    <!--    <ChildComponent-->
    <!--      :modelValue="modelValue"-->
    <!--      @update:modelValue="$emit('update:modelValue', $event)"-->
    <!--    />-->

    <ChildComponent v-model="name" />
  </div>
</template>

<script setup lang="ts">
import ChildComponent from '@/features/defineModel/ChildComponent.vue';

// interface Props {
//   modelValue: string;
// }
//
// interface Emits {
//   (e: 'update:modelValue', value: string): void;
// }
//
// defineProps<Props>();
// defineEmits<Emits>();

const name = defineModel();
</script>
