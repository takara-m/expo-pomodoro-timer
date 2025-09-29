import { useTimerStore } from '../../stores/timerStore';

describe('timerStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useTimerStore.getState();
    store.reset();
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const state = useTimerStore.getState();

      expect(state.timeLeft).toBe(1500); // 25 minutes in seconds
      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(false);
      expect(state.totalTime).toBe(1500);
    });
  });

  describe('start timer', () => {
    it('should start the timer', () => {
      const { start } = useTimerStore.getState();

      start();
      const state = useTimerStore.getState();

      expect(state.isRunning).toBe(true);
      expect(state.isPaused).toBe(false);
    });

    it('should resume from paused state', () => {
      const { start, pause } = useTimerStore.getState();

      // Start, then pause
      start();
      pause();

      let state = useTimerStore.getState();
      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(true);

      // Resume
      start();
      state = useTimerStore.getState();

      expect(state.isRunning).toBe(true);
      expect(state.isPaused).toBe(false);
    });
  });

  describe('pause timer', () => {
    it('should pause the running timer', () => {
      const { start, pause } = useTimerStore.getState();

      // Start timer first
      start();
      let state = useTimerStore.getState();
      expect(state.isRunning).toBe(true);

      // Pause timer
      pause();
      state = useTimerStore.getState();

      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(true);
    });

    it('should not pause if timer is not running', () => {
      const { pause } = useTimerStore.getState();

      // Try to pause without starting
      pause();
      const state = useTimerStore.getState();

      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(false);
    });
  });

  describe('reset timer', () => {
    it('should reset timer to initial state', () => {
      const { start, tick, reset } = useTimerStore.getState();

      // Start and modify state
      start();
      tick(); // Decrease time

      let state = useTimerStore.getState();
      expect(state.timeLeft).toBe(1499);
      expect(state.isRunning).toBe(true);

      // Reset
      reset();
      state = useTimerStore.getState();

      expect(state.timeLeft).toBe(1500);
      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(false);
    });
  });

  describe('tick timer', () => {
    it('should decrease time by 1 second when running', () => {
      const { start, tick } = useTimerStore.getState();

      start();
      tick();

      const state = useTimerStore.getState();
      expect(state.timeLeft).toBe(1499);
    });

    it('should not decrease time when not running', () => {
      const { tick } = useTimerStore.getState();

      tick();

      const state = useTimerStore.getState();
      expect(state.timeLeft).toBe(1500);
    });

    it('should not decrease time below 0', () => {
      const { start, tick, reset } = useTimerStore.getState();

      start();
      // Set timeLeft to 1 manually for testing
      useTimerStore.setState({ timeLeft: 1 });

      tick();

      const state = useTimerStore.getState();
      expect(state.timeLeft).toBe(0);
      expect(state.isRunning).toBe(false); // Should auto-stop at 0
    });

    it('should stop timer when reaching 0', () => {
      const { start, tick } = useTimerStore.getState();

      start();
      // Set timeLeft to 0 manually for testing
      useTimerStore.setState({ timeLeft: 1 });

      tick();

      const state = useTimerStore.getState();
      expect(state.timeLeft).toBe(0);
      expect(state.isRunning).toBe(false);
      expect(state.isPaused).toBe(false);
    });
  });

  describe('formatted time', () => {
    it('should format time correctly for MM:SS', () => {
      const state = useTimerStore.getState();
      expect(state.formattedTime).toBe('25:00');

      // Test different times by simulating ticks
      const { start } = useTimerStore.getState();
      start();

      // Simulate 5 minutes and 30 seconds passed (330 ticks)
      for (let i = 0; i < 330; i++) {
        const { tick } = useTimerStore.getState();
        tick();
      }

      const newState = useTimerStore.getState();
      expect(newState.formattedTime).toBe('19:30');
    });

    it('should handle single digit minutes and seconds', () => {
      const { start } = useTimerStore.getState();
      start();

      // Simulate time down to 5:09 (1191 ticks)
      for (let i = 0; i < 1191; i++) {
        const { tick } = useTimerStore.getState();
        tick();
      }

      const state = useTimerStore.getState();
      expect(state.formattedTime).toBe('05:09');
    });

    it('should show 00:00 when timer is finished', () => {
      const { start } = useTimerStore.getState();
      start();

      // Tick until completion
      for (let i = 0; i < 1500; i++) {
        const { tick } = useTimerStore.getState();
        tick();
      }

      const state = useTimerStore.getState();
      expect(state.formattedTime).toBe('00:00');
    });
  });
});