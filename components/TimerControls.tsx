import { Button, XStack } from 'tamagui';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerControls = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) => {
  const getPrimaryButton = () => {
    if (isRunning) {
      return (
        <Button
          size="$5"
          theme="orange"
          onPress={onPause}
          accessibilityLabel="Pause timer"
          accessibilityRole="button"
        >
          Pause
        </Button>
      );
    }

    if (isPaused) {
      return (
        <Button
          size="$5"
          theme="blue"
          onPress={onStart}
          accessibilityLabel="Resume timer"
          accessibilityRole="button"
        >
          Resume
        </Button>
      );
    }

    return (
      <Button
        size="$5"
        theme="blue"
        onPress={onStart}
        accessibilityLabel="Start timer"
        accessibilityRole="button"
      >
        Start
      </Button>
    );
  };

  return (
    <XStack
      testID="timer-controls"
      space="$4"
      justifyContent="center"
      alignItems="center"
      padding="$4"
    >
      {getPrimaryButton()}
      <Button
        size="$5"
        theme="red"
        variant="outlined"
        onPress={onReset}
        accessibilityLabel="Reset timer"
        accessibilityRole="button"
      >
        Reset
      </Button>
    </XStack>
  );
};