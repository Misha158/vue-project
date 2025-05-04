<template>
  <div
    class="popover-container"
    @mouseenter="showPopover"
    @mouseleave="hidePopover"
    ref="container"
  >
    <div ref="initialElementRef">
      <slot></slot>
    </div>

    <div v-if="isPopoverVisible" class="popover-content" :style="popoverStyle" ref="popoverContent">
      <div :class="`popover-arrow--${position}`" />

      <div class="popover-inner">
        <slot name="popover"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface Props {
  position: 'top' | 'bottom' | 'left' | 'right';
}

const props = defineProps<Props>();

const isPopoverVisible = ref(false);
const popoverStyle = ref({});

const offset = 10;

const container = ref(null);
const popoverContent = ref(null);
const initialElementRef = ref(null);

const showPopover = () => {
  isPopoverVisible.value = true;
};

const hidePopover = () => {
  isPopoverVisible.value = false;
};

const calculatePopoverPosition = () => {
  const trigger = initialElementRef.value;
  const popover = popoverContent.value;

  if (!trigger || !popover) return;

  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  if (props.position === 'right') {
    const top = triggerRect.top + window.scrollY + triggerRect.height / 2 - popoverRect.height / 2;
    const left = triggerRect.right + offset;

    popoverStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
  }

  if (props.position === 'bottom') {
    const top = triggerRect.bottom + window.scrollY + offset;
    const left = triggerRect.left + window.scrollX + triggerRect.width / 2 - popoverRect.width / 2;

    popoverStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
  }

  if (props.position === 'top') {
    const offset = 8;
    const top = triggerRect.top + window.scrollY - popoverRect.height - offset;
    const left = triggerRect.left + window.scrollX + triggerRect.width / 2 - popoverRect.width / 2;

    popoverStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
  }

  if (props.position === 'left') {
    const offset = 8;
    const top = triggerRect.top + window.scrollY + triggerRect.height / 2 - popoverRect.height / 2;
    const left = triggerRect.left + window.scrollX - popoverRect.width - offset;

    popoverStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    };
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
  padding: 30px 10px;

  border-radius: 5px;
  min-width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  transition: opacity 0.3s;
}

.popover-arrow {
  position: absolute;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.popover-arrow--top {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 10px solid #333;
  border-bottom: none;
}

.popover-arrow--right {
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  border-right: 10px solid #333;
  border-left: none;
}

.popover-arrow--bottom {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-top: none;
  border-bottom: 10px solid #333;
}

.popover-arrow--left {
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
