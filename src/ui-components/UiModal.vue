<template>
  <Teleport to="body">
    <Transition name="fade-zoom">
      <div v-if="visible" class="ui-modal__overlay" @click.self="$emit('close')">
        <div>
          <div class="ui-modal__content">
            <div class="text-black text-end me-2 cursor-pointer" @click="$emit('close')">X</div>
            <div class="ui-modal__main-content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'close'): void;
}

interface Props {
  visible: boolean;
}

interface Slots {
  default: () => any;
}

defineProps<Props>();
defineEmits<Emits>();
defineSlots<Slots>();
</script>

<style scoped lang="scss">
.ui-modal {
  &__overlay {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  &__content {
    background: white;
    border-radius: 10px;
    color: black;
  }

  &__main-content {
    padding: 0 30px 10px;
  }
}

/* Transition анимация */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.7s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
