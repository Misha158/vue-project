<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <span v-if="loading" class="loader mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface Props {
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const onClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};

const baseClasses = 'rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none cursor-pointer';

const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
};

const buttonClasses = computed(() => {
  const variantClasses = variants[props.variant];
  const disabledClasses = props.disabled || props.loading
    ? 'opacity-50 cursor-not-allowed'
    : '';
  return `${baseClasses} ${variantClasses} ${disabledClasses}`;
});
</script>

<style scoped>
.loader {
  width: 1em;
  height: 1em;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
