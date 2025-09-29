import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TimerControls } from '../../components/TimerControls';

describe('TimerControls', () => {
  const mockProps = {
    isRunning: false,
    isPaused: false,
    onStart: jest.fn(),
    onPause: jest.fn(),
    onReset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('button rendering based on timer state', () => {
    it('should render Start button when timer is not running', () => {
      const { getByText, queryByText } = render(
        <TimerControls {...mockProps} />
      );

      expect(getByText('Start')).toBeTruthy();
      expect(queryByText('Pause')).toBeNull();
      expect(queryByText('Resume')).toBeNull();
      expect(getByText('Reset')).toBeTruthy();
    });

    it('should render Pause button when timer is running', () => {
      const { getByText, queryByText } = render(
        <TimerControls {...mockProps} isRunning={true} />
      );

      expect(queryByText('Start')).toBeNull();
      expect(getByText('Pause')).toBeTruthy();
      expect(queryByText('Resume')).toBeNull();
      expect(getByText('Reset')).toBeTruthy();
    });

    it('should render Resume button when timer is paused', () => {
      const { getByText, queryByText } = render(
        <TimerControls {...mockProps} isPaused={true} />
      );

      expect(queryByText('Start')).toBeNull();
      expect(queryByText('Pause')).toBeNull();
      expect(getByText('Resume')).toBeTruthy();
      expect(getByText('Reset')).toBeTruthy();
    });
  });

  describe('button interactions', () => {
    it('should call onStart when Start button is pressed', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      fireEvent.press(getByText('Start'));

      expect(mockProps.onStart).toHaveBeenCalledTimes(1);
    });

    it('should call onPause when Pause button is pressed', () => {
      const { getByText } = render(
        <TimerControls {...mockProps} isRunning={true} />
      );

      fireEvent.press(getByText('Pause'));

      expect(mockProps.onPause).toHaveBeenCalledTimes(1);
    });

    it('should call onStart when Resume button is pressed', () => {
      const { getByText } = render(
        <TimerControls {...mockProps} isPaused={true} />
      );

      fireEvent.press(getByText('Resume'));

      expect(mockProps.onStart).toHaveBeenCalledTimes(1);
    });

    it('should call onReset when Reset button is pressed', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      fireEvent.press(getByText('Reset'));

      expect(mockProps.onReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('button styling and layout', () => {
    it('should have proper layout with XStack', () => {
      const { getByTestId } = render(<TimerControls {...mockProps} />);

      const container = getByTestId('timer-controls');
      expect(container.props.style).toMatchObject({
        justifyContent: 'center',
        alignItems: 'center',
      });
    });

    it('should have consistent button spacing', () => {
      const { getByTestId } = render(<TimerControls {...mockProps} />);

      const container = getByTestId('timer-controls');
      expect(container.props.style).toContain({
        space: '$4',
      });
    });

    it('should use appropriate theme for primary action', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      const startButton = getByText('Start');
      expect(startButton.props.style).toMatchObject({
        theme: 'blue',
      });
    });

    it('should use appropriate theme for pause action', () => {
      const { getByText } = render(
        <TimerControls {...mockProps} isRunning={true} />
      );

      const pauseButton = getByText('Pause');
      expect(pauseButton.props.style).toMatchObject({
        theme: 'orange',
      });
    });

    it('should use appropriate theme for reset action', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      const resetButton = getByText('Reset');
      expect(resetButton.props.style).toMatchObject({
        theme: 'red',
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper accessibility labels for buttons', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      const startButton = getByText('Start');
      const resetButton = getByText('Reset');

      expect(startButton.props.accessibilityLabel).toBe('Start timer');
      expect(resetButton.props.accessibilityLabel).toBe('Reset timer');
    });

    it('should have proper accessibility labels for different states', () => {
      const { getByText, rerender } = render(
        <TimerControls {...mockProps} isRunning={true} />
      );

      let pauseButton = getByText('Pause');
      expect(pauseButton.props.accessibilityLabel).toBe('Pause timer');

      rerender(<TimerControls {...mockProps} isPaused={true} />);
      const resumeButton = getByText('Resume');
      expect(resumeButton.props.accessibilityLabel).toBe('Resume timer');
    });

    it('should have button role for accessibility', () => {
      const { getByText } = render(<TimerControls {...mockProps} />);

      const startButton = getByText('Start');
      const resetButton = getByText('Reset');

      expect(startButton.props.accessibilityRole).toBe('button');
      expect(resetButton.props.accessibilityRole).toBe('button');
    });
  });
});