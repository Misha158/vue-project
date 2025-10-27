<template>
  <div v-if="isActive">
    <!-- затемнение фона с вырезанным окном -->
    <div class="overlay" :style="overlayStyle" @click="nextStep"></div>

    <!-- тултип с описанием -->
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
import { ref, computed, onMounted, nextTick, watch } from 'vue';

/**
 * Props: steps — список шагов с CSS-селекторами
 * Пример:
 * [
 *   { selector: '#settings-btn', title: 'Настройки', content: 'Откройте параметры приложения' },
 *   { selector: '#profile', title: 'Профиль', content: 'Редактируйте информацию о себе' }
 * ]
 */
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
});

const isActive = ref(props.autoStart);
const currentStepIndex = ref(0);
const activeElRect = ref(null);

const currentStep = computed(() => props.steps[currentStepIndex.value]);

// обновляем координаты активного элемента
const updateRect = () => {
  const step = currentStep.value;
  if (!step) return;
  const el = document.querySelector(step.element);
  console.log({ el });
  if (el) {
    const rect = el.getBoundingClientRect();
    activeElRect.value = rect;
  } else {
    activeElRect.value = null;
  }
};

onMounted(() => {
  nextTick(updateRect);
});

watch(currentStepIndex, async () => {
  await nextTick();
  updateRect();
});

const padding = 8;

const overlayStyle = computed(() => {
  if (!activeElRect.value) return {};
  const r = activeElRect.value;
  return {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    backdropFilter: 'blur(1px)',
    clipPath: `polygon(
      0 0,
      0 100%,
      100% 100%,
      100% 0,
      0 0,
      0 ${r.top - padding}px,
      ${r.left - padding}px ${r.top - padding}px,
      ${r.left - padding}px ${r.bottom + padding}px,
      ${r.right + padding}px ${r.bottom + padding}px,
      ${r.right + padding}px ${r.top - padding}px,
      ${r.left - padding}px ${r.top - padding}px
    )`,
    transition: 'clip-path 0.3s ease',
    zIndex: 1000,
    cursor: 'pointer',
  };
});

const tooltipStyle = computed(() => {
  if (!activeElRect.value) return {};
  const { top, left, height } = activeElRect.value;
  return {
    position: 'fixed',
    top: `${top + height + 12}px`,
    left: `${left}px`,
    zIndex: 1001,
    background: '#fff',
    color: '#222',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    width: '260px',
    transition: 'all 0.3s ease',
  };
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
.overlay {
  transition: clip-path 0.3s ease;
}

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
