<template>
  <main>
    <!--    <UiPopoverPage />-->
    <!--    <UiCheckbox v-model="value"> Is agree </UiCheckbox>-->
    <!--    <UiSelect-->
    <!--      v-model="selected"-->
    <!--      :options="[-->
    <!--        { label: 'Apple', value: 'apple' },-->
    <!--        { label: 'Banana', value: 'banana' },-->
    <!--        { label: 'Cherry', value: 'cherry' },-->
    <!--      ]"-->
    <!--      :mode="'multiple'"-->
    <!--    />-->
    <div>Home</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UiPopoverPage from '@/features/UiPopoverPage.vue';
import UiCheckbox from '@/components/UiCheckbox.vue';
import UiSelect from '@/components/UiSelect.vue';

const selected = ref([]);

onMounted(() => {
  selected.value.push('apple');
});
</script>
