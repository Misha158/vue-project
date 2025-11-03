<template>
  <div v-if="isActive">
    <!-- подсвечиваемый элемент -->
    <div v-if="activeElRect" class="highlight" :style="highlightStyle"></div>

    <!-- тултип -->
    <div v-if="activeElRect" class="tooltip" :style="tooltipStyle">
      <h4 class="tooltip-title">{{ currentStep.title }}</h4>
      <p class="tooltip-content">{{ currentStep.content }}</p>
      <div class="tooltip-actions">
        <button @click.stop="prevStep" :disabled="currentStepIndex === 0">Назад</button>
        <button @click.stop="nextStep">
          {{ currentStepIndex === steps.length - 1 ? 'Готово' : 'Далее' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Exmplanation
// 1. Take coordinates and w/h from current element
// 2.

import { ref, computed, onMounted, nextTick, watch } from 'vue';

const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
});

const isActive = ref(props.autoStart);
const currentStepIndex = ref(0);
const activeElRect = ref(null);

const currentStep = computed(() => props.steps[currentStepIndex.value]);

const updateRect = () => {
  const step = currentStep.value;
  if (!step) return;

  const el = document.querySelector(step.element);
  if (el) {
    activeElRect.value = el.getBoundingClientRect();
  } else {
    activeElRect.value = null;
  }
};

onMounted(() => nextTick(updateRect));

watch(currentStepIndex, async () => {
  await nextTick();
  updateRect();
});

const padding = 8;

const highlightStyle = computed(() => {
  if (!activeElRect.value) return {};
  const { top, left, width, height } = activeElRect.value;
  return {
    position: 'fixed',
    top: `${top - padding}px`,
    left: `${left - padding}px`,
    width: `${width + padding * 2}px`,
    height: `${height + padding * 2}px`,
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
    borderRadius: '8px',
    zIndex: 1000,
    pointerEvents: 'none',
    transition: 'all 0.3s ease',
    background: 'transparent', // <-- важно
  };
});

const tooltipStyle = computed(() => {
  if (!activeElRect.value) return {};
  const { top, left, width, height } = activeElRect.value;
  const spacing = 12;
  const tooltipWidth = 260;

  const baseStyle = {
    position: 'fixed',
    zIndex: 1001,
    background: '#fff',
    color: '#222',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    width: `${tooltipWidth}px`,
    transition: 'all 0.3s ease',
  };

  switch (props.position) {
    case 'top':
      return {
        ...baseStyle,
        bottom: `${window.innerHeight - top + spacing}px`,
        left: `${left}px`,
      };
    case 'bottom':
      return {
        ...baseStyle,
        top: `${top + height + spacing}px`,
        left: `${left}px`,
      };
    case 'left':
      return {
        ...baseStyle,
        top: `${top}px`,
        right: `${window.innerWidth - left + spacing}px`,
      };
    case 'right':
      return {
        ...baseStyle,
        top: `${top}px`,
        left: `${left + width + spacing}px`,
      };
    default:
      return {
        ...baseStyle,
        top: `${top + height + spacing}px`,
        left: `${left}px`,
      };
  }
});

const nextStep = () => {
  if (currentStepIndex.value < props.steps.length - 1) {
    currentStepIndex.value++;
  } else {
    isActive.value = false;
  }
};

const prevStep = () => {
  if (currentStepIndex.value > 0) currentStepIndex.value--;
};
</script>

<style scoped>
.tooltip-title {
  font-weight: 600;
  margin-bottom: 6px;
}

.tooltip-content {
  font-size: 14px;
  margin-bottom: 12px;
}

.tooltip-actions {
  display: flex;
  justify-content: space-between;
}

.tooltip-actions button {
  background: #007bff;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tooltip-actions button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
