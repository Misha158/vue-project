<template>
  <div class="stepper">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="stepClass(index)"
      class="z-10"
    >
      <div class="flex flex-col items-center justify-center">
        <button class="circle" @click="onChangeStep(index)">
          {{ index + 1 }}
        </button>

        <div class="label text-xs">{{ step.title }}</div>

        <template v-if="step.nameForSlot">
          <slot :subTitle="step.subTitle" :name="step.nameForSlot" />
        </template>
        <template v-else>
          <div class="label !text-black text-xs font-thin">
            {{ step.subTitle }}
          </div>
        </template>
      </div>
    </div>

    <div class="line" />
  </div>
</template>

<script lang="ts" setup>
interface StepInfo {
  title: string;
  subTitle?: string;
  nameForSlot?: string;
}

interface Props {
  steps: StepInfo[];
  activeStepIndex: number;
}

interface Emits {
  (e: 'update:activeStepIndex', value: number): void;
  (e: 'clickOnStep', value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onChangeStep = (newStepIndex: number): void => {
  emit('clickOnStep', newStepIndex);
  if (newStepIndex < props.activeStepIndex) {
    emit('update:activeStepIndex', newStepIndex);
  }
};

const stepClass = (index: number) => ({
  active: props.activeStepIndex === index,
  completeStep: props.activeStepIndex > index
});
</script>

<style scoped lang="scss">
.stepper {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  height: 60px;
}

.line {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 68px);
  height: 1px;
  background-color: gray;
  z-index: 1;
}

.circle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  border: 1px solid gray;
  cursor: pointer;
}

.active .circle {
  background-color: #FCE9ED;
  border-color: #E61E4E;
  color: #E61E4E;
}

.completeStep .circle {
  border-color: #E61E4E;
  color: #E61E4E;
}

.active .label,
.completeStep .label {
  color: #E61E4E;
}

.label {
  margin-top: 5px;
}
</style>
