import React from 'react';
import { render } from '@testing-library/react-native';
import { TimerDisplay } from '../../components/TimerDisplay';

describe('TimerDisplay', () => {
  describe('rendering', () => {
    it('should render formatted time', () => {
      const { getByText } = render(<TimerDisplay formattedTime="25:00" />);

      expect(getByText('25:00')).toBeTruthy();
    });

    it('should render different time formats', () => {
      const { getByText, rerender } = render(<TimerDisplay formattedTime="05:30" />);

      expect(getByText('05:30')).toBeTruthy();

      rerender(<TimerDisplay formattedTime="00:01" />);
      expect(getByText('00:01')).toBeTruthy();

      rerender(<TimerDisplay formattedTime="00:00" />);
      expect(getByText('00:00')).toBeTruthy();
    });
  });

  describe('styling', () => {
    it('should have large font size for time display', () => {
      const { getByText } = render(<TimerDisplay formattedTime="25:00" />);

      const timeText = getByText('25:00');
      expect(timeText.props.style).toMatchObject({
        fontSize: 64,
      });
    });

    it('should have center alignment', () => {
      const { getByTestId } = render(<TimerDisplay formattedTime="25:00" />);

      const container = getByTestId('timer-display');
      expect(container.props.style).toMatchObject({
        alignItems: 'center',
      });
    });

    it('should use color token for text', () => {
      const { getByText } = render(<TimerDisplay formattedTime="25:00" />);

      const timeText = getByText('25:00');
      expect(timeText.props.style).toMatchObject({
        color: '$color',
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper accessibility label', () => {
      const { getByText } = render(<TimerDisplay formattedTime="25:00" />);

      const timeText = getByText('25:00');
      expect(timeText.props.accessibilityLabel).toBe('Timer: 25 minutes and 0 seconds');
    });

    it('should handle different time formats in accessibility label', () => {
      const { getByText, rerender } = render(<TimerDisplay formattedTime="05:30" />);

      let timeText = getByText('05:30');
      expect(timeText.props.accessibilityLabel).toBe('Timer: 5 minutes and 30 seconds');

      rerender(<TimerDisplay formattedTime="00:01" />);
      timeText = getByText('00:01');
      expect(timeText.props.accessibilityLabel).toBe('Timer: 0 minutes and 1 seconds');

      rerender(<TimerDisplay formattedTime="00:00" />);
      timeText = getByText('00:00');
      expect(timeText.props.accessibilityLabel).toBe('Timer: 0 minutes and 0 seconds');
    });

    it('should mark text as important for accessibility', () => {
      const { getByText } = render(<TimerDisplay formattedTime="25:00" />);

      const timeText = getByText('25:00');
      expect(timeText.props.accessibilityRole).toBe('text');
      expect(timeText.props.importantForAccessibility).toBe('yes');
    });
  });
});