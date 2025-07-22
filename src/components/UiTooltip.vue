<template>
  <div class="tooltip-wrapper" @mouseenter="startShowTimer" @mouseleave="startHideTimer">
    <slot />
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isVisible" class="tooltip" :class="[positionClass]" :style="tooltipStyle">
        {{ text }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
  offset: 8,
});

const isVisible = ref(false);
let showTimer: number | undefined;
let hideTimer: number | undefined;

const startShowTimer = () => {
  clearTimeout(hideTimer);
  showTimer = setTimeout(() => {
    console.log('start');
    isVisible.value = true;
  }, 200);
};

const startHideTimer = () => {
  clearTimeout(showTimer);
  hideTimer = setTimeout(() => {
    console.log('hide');
    isVisible.value = false;
  }, 200);
};

const clearHideTimer = () => {
  clearTimeout(hideTimer);
};

const positionClass = computed(() => {
  return {
    top: 'tooltip-top',
    right: 'tooltip-right',
    bottom: 'tooltip-bottom',
    left: 'tooltip-left',
  }[props.position];
});

const tooltipStyle = computed(() => {
  const offset = `${props.offset}px`;
  return {
    '--tooltip-offset': offset,
  };
});
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip {
  position: absolute;
  background-color: #1f2937;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Bridge between icon and tooltip */
.tooltip::after {
  content: '';
  position: absolute;
  background-color: transparent;
}

.tooltip-right::after {
  width: var(--tooltip-offset);
  height: 100%;
  left: calc(var(--tooltip-offset) * -1);
  top: 0;
}

.tooltip-left::after {
  width: var(--tooltip-offset);
  height: 100%;
  right: calc(var(--tooltip-offset) * -1);
  top: 0;
}

.tooltip-top::after {
  width: 100%;
  height: var(--tooltip-offset);
  bottom: calc(var(--tooltip-offset) * -1);
  left: 0;
}

.tooltip-bottom::after {
  width: 100%;
  height: var(--tooltip-offset);
  top: calc(var(--tooltip-offset) * -1);
  left: 0;
}

.tooltip-right {
  left: calc(100% + var(--tooltip-offset));
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-left {
  right: calc(100% + var(--tooltip-offset));
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-top {
  bottom: calc(100% + var(--tooltip-offset));
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-bottom {
  top: calc(100% + var(--tooltip-offset));
  left: 50%;
  transform: translateX(-50%);
}

/* Arrow styles */
.tooltip::before {
  content: '';
  position: absolute;
  border: 6px solid transparent;
}

.tooltip-right::before {
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-right-color: #1f2937;
}

.tooltip-left::before {
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  border-left-color: #1f2937;
}

.tooltip-top::before {
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #1f2937;
}

.tooltip-bottom::before {
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #1f2937;
}
</style>
