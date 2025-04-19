import { onMounted, onUnmounted } from 'vue';

export function useInactivityWatcher(options?: {
  timeoutMs?: number;
  checkIntervalMs?: number;
  onInactive?: () => void;
}) {
  const timeoutMs = options?.timeoutMs ?? 10 * 60 * 1000; // 10 минут по умолчанию
  const checkIntervalMs = options?.checkIntervalMs ?? 10_000; // каждые 10 сек
  const onInactive = options?.onInactive ?? (() => window.location.reload());

  let lastActivityTime = Date.now();
  let intervalId: ReturnType<typeof setInterval>;

  const updateLastActivityTime = () => {
    lastActivityTime = Date.now();
  };

  const throttle = (fn: () => void, delay: number) => {
    let lastCall = 0;
    return () => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn();
      }
    };
  };

  const throttledMouseMove = throttle(updateLastActivityTime, 1000);

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

  onMounted(() => {
    window.addEventListener('click', updateLastActivityTime);
    window.addEventListener('keydown', updateLastActivityTime);
    window.addEventListener('touchstart', updateLastActivityTime);
    window.addEventListener('mousemove', throttledMouseMove);

    intervalId = setInterval(checkInactivity, checkIntervalMs);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('click', updateLastActivityTime);
    window.removeEventListener('keydown', updateLastActivityTime);
    window.removeEventListener('touchstart', updateLastActivityTime);
    window.removeEventListener('mousemove', throttledMouseMove);
  });
}
