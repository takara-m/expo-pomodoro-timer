import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  totalTime: number;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;
}

const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: POMODORO_DURATION,
  isRunning: false,
  isPaused: false,
  totalTime: POMODORO_DURATION,
  formattedTime: formatTime(POMODORO_DURATION),

  start: () => {
    set((state) => ({
      isRunning: true,
      isPaused: false,
    }));
  },

  pause: () => {
    set((state) => {
      if (state.isRunning) {
        return {
          isRunning: false,
          isPaused: true,
        };
      }
      return state;
    });
  },

  reset: () => {
    set({
      timeLeft: POMODORO_DURATION,
      isRunning: false,
      isPaused: false,
      totalTime: POMODORO_DURATION,
      formattedTime: formatTime(POMODORO_DURATION),
    });
  },

  tick: () => {
    set((state) => {
      if (!state.isRunning) {
        return state;
      }

      const newTimeLeft = Math.max(0, state.timeLeft - 1);

      if (newTimeLeft === 0) {
        // Timer finished, stop automatically
        return {
          timeLeft: newTimeLeft,
          isRunning: false,
          isPaused: false,
          formattedTime: formatTime(newTimeLeft),
        };
      }

      return {
        timeLeft: newTimeLeft,
        formattedTime: formatTime(newTimeLeft),
      };
    });
  },
}));