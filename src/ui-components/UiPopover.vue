<template>
  <div
    class="popover-container"
    @mouseenter="isPopoverVisible = true"
    @mouseleave="isPopoverVisible = false"
    ref="container"
  >
    <div ref="triggerRef">
      <slot name="trigger" />
    </div>

    <div v-if="isPopoverVisible" class="popover-content" :style="popoverStyle" ref="popoverContent">
      <div :class="`popover-arrow popover-arrow--${props.position}`" :style="arrowStyle" />

      <div class="popover-inner">
        <slot name="popover"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive, computed } from 'vue';

interface Props {
  position: 'top' | 'bottom' | 'left' | 'right';
}

const props = defineProps<Props>();

const isPopoverVisible = ref(false);
const position = reactive({ top: 0, left: 0 });
const positionArrow = reactive({ top: 0, left: 0 });

const offset = 10;

const container = ref(null);
const popoverContent = ref(null);
const triggerRef = ref(null);

const popoverStyle = computed(() => {
  const base = {
    top: `${position.top}px`,
    left: `${position.left}px`,
  };

  return base;
});

const arrowStyle = computed(() => {
  const base = {
    top: `${positionArrow.top}px`,
    left: `${positionArrow.left}px`,
  };

  return base;
});

const calculatePopoverPosition = () => {
  const trigger = triggerRef.value;
  const popover = popoverContent.value;

  if (!trigger || !popover) return;

  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  if (props.position === 'right') {
    position.left = triggerRect.right + offset;
    position.top =
      triggerRect.top + window.scrollY + triggerRect.height / 2 - popoverRect.height / 2;

    // positionArrow.left = popoverRect.left - offset + 1;
    positionArrow.left = triggerRect.right + 2;
    // positionArrow.top = triggerRect.top + 30 + window.scrollY + triggerRect.height / 2;
    positionArrow.top = triggerRect.top + 5 + triggerRect.top / 2;
  }

  if (props.position === 'bottom') {
    position.left =
      triggerRect.left + window.scrollX + triggerRect.width / 2 - popoverRect.width / 2;
    position.top = triggerRect.bottom + window.scrollY + offset;
  }

  if (props.position === 'top') {
    position.left =
      triggerRect.left + window.scrollX + triggerRect.width / 2 - popoverRect.width / 2;
    position.top = triggerRect.top + window.scrollY - popoverRect.height - offset;
  }

  if (props.position === 'left') {
    position.left = triggerRect.left + window.scrollX - popoverRect.width - offset;
    position.top =
      triggerRect.top + window.scrollY + triggerRect.height / 2 - popoverRect.height / 2;
  }

  // Коррекция, если поповер выходит за пределы экрана
  // Корректировка по оси X (горизонталь)
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (position.left + popoverRect.width > viewportWidth) {
    position.left = viewportWidth - popoverRect.width - offset; // Сдвигаем поповер влево, чтобы он не выходил за экран
  }
  if (position.left < 0) {
    position.left = offset; // Если поповер слишком сильно сместился влево, сдвигаем его на заданный отступ
  }

  // Корректировка по оси Y (вертикаль)
  if (position.top + popoverRect.height > viewportHeight) {
    position.top = viewportHeight - popoverRect.height - offset; // Сдвигаем поповер вниз, чтобы он не выходил за экран по высоте
  }
  if (position.top < 0) {
    position.top = offset; // Если поповер слишком сильно поднялся вверх, сдвигаем его вниз
  }
};

watch(popoverContent, (newVal) => {
  if (newVal) {
    calculatePopoverPosition();
  }
});
</script>

<style scoped>
.popover-container {
  position: relative;
  display: inline-block;
}

.popover-content {
  position: fixed;
  background-color: #333;
  color: white;
  padding: 00px 10px;

  border-radius: 5px;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  transition: opacity 0.3s;
}

.popover-arrow {
  position: fixed;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;

  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  border-right: 10px solid black;
  border-left: none;
}

.popover-container:hover .popover-content {
  opacity: 1;
}

.popover-inner {
  text-align: center;
}
</style>
