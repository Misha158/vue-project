<template>
  <div v-if="isActive" class="tutorial-overlay">
    <div class="tutorial-highlight" :style="highlightStyle"></div>

    <div class="tutorial-popup" :style="popupStyle">
      <h3>{{ currentStep.title }}</h3>
      <p>{{ currentStep.content }}</p>

      <div class="buttons">
        <button @click="prevStep" :disabled="stepIndex === 0">← Назад</button>
        <button @click="nextStep">
          {{ stepIndex === steps.length - 1 ? 'Завершить' : 'Далее →' }}
        </button>
        <button @click="skipTutorial">Пропустить ✖</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';

const props = defineProps({
  steps: { type: Array, required: true },
});

const isActive = ref(false);
const stepIndex = ref(0);
const highlightStyle = ref({});
const popupStyle = ref({});

const currentStep = computed(() => props.steps[stepIndex.value]);

const showTutorial = async () => {
  isActive.value = true;
  await nextTick();
  positionHighlight();
};

const positionHighlight = () => {
  const el = document.querySelector(currentStep.value.element);
  if (!el) return;

  const rect = el.getBoundingClientRect();

  highlightStyle.value = {
    top: `${rect.top + window.scrollY - 8}px`,
    left: `${rect.left + window.scrollX - 8}px`,
    width: `${rect.width + 16}px`,
    height: `${rect.height + 16}px`,
  };

  popupStyle.value = {
    top: `${rect.bottom + window.scrollY + 10}px`,
    left: `${rect.left + window.scrollX}px`,
  };
};

const nextStep = async () => {
  if (stepIndex.value < props.steps.length - 1) {
    stepIndex.value++;
    await nextTick();
    positionHighlight();
  } else finishTutorial();
};

const prevStep = async () => {
  if (stepIndex.value > 0) {
    stepIndex.value--;
    await nextTick();
    positionHighlight();
  }
};

const finishTutorial = () => {
  isActive.value = false;
  localStorage.setItem('tutorialCompleted', 'true');
};

const skipTutorial = () => finishTutorial();

onMounted(() => {
  if (!localStorage.getItem('tutorialCompleted')) {
    showTutorial();
  }
});
</script>

<style scoped>
.tutorial-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}

.tutorial-highlight {
  position: absolute;
  border: 3px solid #00bfff;
  border-radius: 10px;
  box-shadow: 0 0 15px #00bfff;
  pointer-events: none;
  transition: all 0.3s ease;
}

.tutorial-popup {
  position: absolute;
  background: white;
  color: black;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 280px;
  z-index: 10000;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
