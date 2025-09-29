import '@testing-library/jest-dom';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn) => fn,
  subscribeWithSelector: (fn) => fn,
}));

// Global test setup
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllTimers();
});