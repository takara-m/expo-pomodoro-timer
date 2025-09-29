import { useTimer } from '../../hooks/useTimer';
import { useTimerStore } from '../../stores/timerStore';

// Mock the timer store
jest.mock('../../stores/timerStore');

describe('useTimer', () => {
  const mockTimerStore = {
    timeLeft: 1500,
    isRunning: false,
    isPaused: false,
    formattedTime: '25:00',
    start: jest.fn(),
    pause: jest.fn(),
    reset: jest.fn(),
    tick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useTimerStore as jest.Mock).mockReturnValue(mockTimerStore);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('initial state', () => {
    it('should return timer store values', () => {
      // Mock useTimer hook execution
      const result = useTimer();

      expect(result.timeLeft).toBe(1500);
      expect(result.isRunning).toBe(false);
      expect(result.isPaused).toBe(false);
      expect(result.formattedTime).toBe('25:00');
      expect(typeof result.start).toBe('function');
      expect(typeof result.pause).toBe('function');
      expect(typeof result.reset).toBe('function');
    });
  });

  describe('timer control', () => {
    it('should call store start method when start is called', () => {
      const result = useTimer();

      result.start();

      expect(mockTimerStore.start).toHaveBeenCalledTimes(1);
    });

    it('should call store pause method when pause is called', () => {
      const result = useTimer();

      result.pause();

      expect(mockTimerStore.pause).toHaveBeenCalledTimes(1);
    });

    it('should call store reset method when reset is called', () => {
      const result = useTimer();

      result.reset();

      expect(mockTimerStore.reset).toHaveBeenCalledTimes(1);
    });
  });
});