<template>
  <div>
    <h1 id="page-title">Настройки</h1>
    <UiButton id="save-btn">Сохранить</UiButton>
    <UiButton id="cancel-btn">Отмена</UiButton>

    <TutorialGuide v-if="isTutorialOn" :steps="tutorialSteps" />
  </div>
</template>

<script setup lang="ts">
import TutorialGuide from '@/components/ui-tutorial/TutorialGuide.vue';
import UiButton from '@/components/UiButton.vue';
import { isTutorialOn } from '@/consts/shared.ts';

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
