import { onMounted, onUnmounted } from 'vue';

export const useInactivityWatcher = (options?: {
  timeoutSec?: number;
  checkIntervalSec?: number;
  onInactive?: () => void;
}) => {
  const timeoutMs = (options?.timeoutSec ?? 600) * 1000; // по умолчанию 10 минут
  const checkIntervalMs = (options?.checkIntervalSec ?? 600) * 1000; // по умолчанию проверка каждые 10 минут
  const onInactive = options?.onInactive ?? (() => window.location.reload());

  let lastActivityTime = Date.now();
  let intervalId: ReturnType<typeof setInterval>;
  let lastMousePosition = { x: 0, y: 0 };
  let previousMousePosition = { x: 0, y: 0 }; // Храним предыдущую позицию курсора

  const updateLastActivityTime = () => {
    console.log('update last activity time');
    console.log(document.pointer);
    lastActivityTime = Date.now();
  };

  const updateMousePosition = (event: MouseEvent) => {
    // Сохраняем позицию курсора только при первом движении
    if (lastMousePosition.x === 0 && lastMousePosition.y === 0) {
      lastMousePosition = { x: event.clientX, y: event.clientY };
      console.log('Mouse position recorded: ', lastMousePosition);
    }

    // Обновляем время последней активности
    updateLastActivityTime();
  };

  const checkInactivity = () => {
    const now = Date.now();
    const diff = now - lastActivityTime;

    if (diff >= timeoutMs) {
      console.log('🔒 User inactive');
      onInactive();
    } else {
      console.log(`✅ User active (${Math.floor(diff / 1000)}s ago)`);
    }
  };

  const checkMousePositionChange = () => {
    const now = Date.now();
    const diff = now - lastActivityTime;

    if (diff >= checkIntervalMs) {
      // Проверяем, изменилось ли положение курсора
      if (
        lastMousePosition.x === previousMousePosition.x &&
        lastMousePosition.y === previousMousePosition.y
      ) {
        console.log('No mouse movement detected in the last 10 minutes.');
        onInactive(); // Позиция не изменилась — пользователь неактивен
      } else {
        console.log('Mouse has moved in the last 10 minutes.');
        previousMousePosition = { ...lastMousePosition }; // Обновляем предыдущую позицию
      }
      updateLastActivityTime(); // Обновляем время активности
    }
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);

    // Проверка активности пользователя через каждые 10 минут
    intervalId = setInterval(checkMousePositionChange, checkIntervalMs);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('mousemove', updateMousePosition);
  });
};
