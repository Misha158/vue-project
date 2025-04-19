<template>
  <div
    :style="dropdownStyles"
    class="absolute z-10 mt-2 min-w-[150px] bg-white border border-gray-300 rounded-md shadow-lg"
  >
    <ul>
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
        class="px-4 py-2 text-black cursor-pointer hover:bg-gray-200"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'update:selected', option: string): void
}

interface Props {
  options: string[]
  dropdownStyles: {
    top: string
    left: string
    width: string
  }
}

const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const selectOption = (option: string) => {
  emit('update:selected', option)
}
</script>
