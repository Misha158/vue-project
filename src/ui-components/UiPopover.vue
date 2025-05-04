<template>
  <div class="popover-container" @mouseenter="showPopover">
    <slot></slot>

    <div
      v-if="isPopoverVisible"
      :class="['popover-content', popoverPosition]"
      :style="popoverStyles"
    >
      <div class="popover-arrow" />
      <div class="popover-inner">
        <slot name="popover"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isPopoverVisible = ref(true);

// Пропс для управления позиционированием поповера
const props = defineProps({
  position: {
    type: String,
    default: 'top', // по умолчанию поповер сверху
    validator(value) {
      return ['top', 'right', 'bottom', 'left'].includes(value);
    },
  },
});

// Состояние для позиционирования поповера
const popoverPosition = computed(() => {
  return `popover-content--${props.position}`;
});

// Стили для динамического позиционирования
const popoverStyles = computed(() => {
  switch (props.position) {
    case 'top':
      return { bottom: '120%', left: '50%', transform: 'translateX(-50%)' };
    case 'right':
      return { top: '50%', left: '120%', transform: 'translateY(-50%)' };
    case 'bottom':
      return { top: '120%', left: '50%', transform: 'translateX(-50%)' };
    case 'left':
      return { top: '50%', right: '120%', transform: 'translateY(-50%)' };
    default:
      return {};
  }
});

const showPopover = () => {
  isPopoverVisible.value = true;
};

const hidePopover = () => {
  isPopoverVisible.value = false;
};
</script>

<style scoped>
.popover-container {
  position: relative;
  display: inline-block;
}

.popover-content {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  transition: opacity 0.3s;
}

.popover-content .popover-arrow {
  position: absolute;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.popover-content--top .popover-arrow {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 10px solid #333;
  border-bottom: none;
}

.popover-content--right .popover-arrow {
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  border-right: 10px solid #333;
  border-left: none;
}

.popover-content--bottom .popover-arrow {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-top: none;
  border-bottom: 10px solid #333;
}

.popover-content--left .popover-arrow {
  top: 50%;
  right: -8px;
  transform: translateY(-50%);
  border-left: 10px solid #333;
  border-right: none;
}

.popover-container:hover .popover-content {
  opacity: 1;
}

.popover-inner {
  text-align: center;
}
</style>
