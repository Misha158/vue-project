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
    <div>
      <UiStepper :steps="steps" :active-step-index="activeStepIndex" />
      <div class="flex flex-col justify-start items-start  my-10">
        <UiButton @click="activeStepIndex = activeStepIndex + 1" class="mb-2">Next step</UiButton>
        <UiButton @click="activeStepIndex = activeStepIndex - 1">Prev step step</UiButton>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UiPopoverPage from '@/features/UiPopoverPage.vue';
import UiCheckbox from '@/components/UiCheckbox.vue';
import UiSelect from '@/components/UiSelect.vue';
import UiStepper from "@/components/UiStepper.vue";
import UiButton from "@/components/UiButton.vue";

const selected = ref([]);

const activeStepIndex = ref(0);

const steps = ref([
  {
    title: 'Step 1',
    subTitle: 'Fill in personal info'
  },
  {
    title: 'Step 2',
    subTitle: 'Verify your email'
  },
  {
    title: 'Step 3',
    subTitle: 'Complete registration',
    nameForSlot: 'custom-subtitle-step-3'
  }
]);

onMounted(() => {
  selected.value.push('apple');
});
</script>
