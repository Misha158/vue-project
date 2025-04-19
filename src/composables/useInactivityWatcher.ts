import { onMounted, onUnmounted } from 'vue';

export const useInactivityWatcher = (options?: {
  timeoutSec?: number;
  checkIntervalSec?: number;
  onInactive?: () => void;
}) => {
  const timeoutMs = (options?.timeoutSec ?? 600) * 1000; // по умолчанию 10 минут
  const checkIntervalMs = (options?.checkIntervalSec ?? 10) * 1000;
  const onInactive = options?.onInactive ?? (() => window.location.reload());

  let lastActivityTime = Date.now();
  let intervalId: ReturnType<typeof setInterval>;

  const updateLastActivityTime = () => {
    lastActivityTime = Date.now();
    console.log('MISHAAAA');
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
};
