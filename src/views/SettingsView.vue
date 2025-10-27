<template>
  <div>
    <h1 id="page-title">Настройки</h1>
    <button id="save-btn">Сохранить</button>
    <button id="cancel-btn">Отмена</button>

    <TutorialGuide :steps="tutorialSteps" />
  </div>
</template>

<script setup lang="ts">
import TutorialGuide from '@/components/ui-tutorial/TutorialGuide.vue';

const tutorialSteps = [
  {
    element: '#page-title',
    title: 'Раздел настроек',
    content: 'Здесь вы можете управлять параметрами приложения.',
  },
  {
    element: '#save-btn',
    title: 'Кнопка сохранения',
    content: 'Нажмите, чтобы применить изменения.',
  },
  {
    element: '#cancel-btn',
    title: 'Отмена',
    content: 'Нажмите, чтобы выйти без сохранения.',
  },
];
</script>
