<template>
  <div class="relative inline-block min-w-36">
    <!-- Кнопка для открытия/закрытия dropdown -->
    <button
      @click="toggleDropdown"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
    >
      {{ selectedOption || 'Select an option' }}
    </button>

    <!-- Выпадающее меню -->
    <div
      v-if="isOpen"
      class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg"
    >
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="px-4 py-2 cursor-pointer text-black hover:bg-gray-200"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  options: string[]
}

interface Emits {
  (e: 'update:selected', options: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectedOption = ref<string>('')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  selectedOption.value = option
  isOpen.value = false

  emit('update:selected', option)
}
</script>
