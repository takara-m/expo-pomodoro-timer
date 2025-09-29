import { Text, YStack } from 'tamagui';

interface TimerDisplayProps {
  formattedTime: string;
}

const formatTimeForAccessibility = (formattedTime: string): string => {
  const [minutes, seconds] = formattedTime.split(':').map(Number);
  return `Timer: ${minutes} minutes and ${seconds} seconds`;
};

export const TimerDisplay = ({ formattedTime }: TimerDisplayProps) => {
  return (
    <YStack
      testID="timer-display"
      alignItems="center"
      justifyContent="center"
      padding="$4"
    >
      <Text
        fontSize={64}
        fontWeight="bold"
        color="$color"
        textAlign="center"
        accessibilityLabel={formatTimeForAccessibility(formattedTime)}
        accessibilityRole="text"
        importantForAccessibility="yes"
      >
        {formattedTime}
      </Text>
    </YStack>
  );
};