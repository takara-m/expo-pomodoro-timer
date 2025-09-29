import { useEffect, useRef } from 'react';
import { useTimerStore } from '../stores/timerStore';

export const useTimer = () => {
  const timerStore = useTimerStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerStore.isRunning) {
      // Start interval
      intervalRef.current = setInterval(() => {
        timerStore.tick();
      }, 1000);
    } else {
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount or when isRunning changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerStore.isRunning, timerStore.tick]);

  return {
    timeLeft: timerStore.timeLeft,
    isRunning: timerStore.isRunning,
    isPaused: timerStore.isPaused,
    formattedTime: timerStore.formattedTime,
    start: timerStore.start,
    pause: timerStore.pause,
    reset: timerStore.reset,
  };
};