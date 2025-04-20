<template>
  <div class="ui-modal__overlay" @click.self="$emit('close')">
    <div>
      <div class="ui-modal__content">
        <div class="text-black text-end me-2 cursor-pointer" @click="$emit('close')">X</div>
        <div class="ui-modal__main-content">
          <slot v-if="$slots" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'close'): void;
}
defineEmits<Emits>();
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
</style>
