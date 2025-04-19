<template>
  <div ref="dropdownRef" class="relative inline-block min-w-[150px]">
    <button
      @click="toggleDropdown"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
    >
      {{ selectedOption || 'Select an option' }}
    </button>

    <!-- Teleport для меню -->
    <Teleport to="body">
      <DropdownList
        v-if="isOpen"
        :options="options"
        @update:selected="selectOption"
        @unmount=""
        :dropdownStyles="dropdownStyles"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import DropdownList from './DropdownList.vue'
import { ref, computed, onMounted } from 'vue'

interface Props {
  options: string[]
}
const props = defineProps<Props>()

interface Emits {
  (e: 'update:selected', option: string): void
}

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectedOption = ref<string>('')
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  selectedOption.value = option
  isOpen.value = false
  emit('update:selected', option)
}

// Вычисляем стили дропдауна с учётом прокрутки контейнера
const dropdownStyles = computed(() => {
  if (dropdownRef.value) {
    const dropdownRect = dropdownRef.value.getBoundingClientRect()

    // Получаем родительский контейнер (он же с прокруткой)
    const container = dropdownRef.value.parentElement
    if (container) {
      // Получаем прокрутку контейнера по горизонтали
      const containerScrollLeft = container.scrollLeft

      // Позиционируем выпадающий список с учётом прокрутки
      return {
        top: `${dropdownRect.bottom + window.scrollY}px`, // Позиция по вертикали
        left: `${dropdownRect.left + containerScrollLeft}px`, // Позиция по горизонтали с учётом прокрутки
        width: `${dropdownRect.width}px`, // Ширина такая же, как у кнопки
      }
    }
  }
  return {}
})
</script>

<style scoped>
/* Дополнительные стили по необходимости */
</style>
