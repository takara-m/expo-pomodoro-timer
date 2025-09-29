import { View, YStack, H1, Text } from 'tamagui';
import { useTimer } from '../hooks/useTimer';
import { TimerDisplay } from '../components/TimerDisplay';
import { TimerControls } from '../components/TimerControls';
import { useThemeContext } from './_layout';

export default function Index() {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const timer = useTimer();

  return (
    <View flex={1} backgroundColor='$background'>
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2" alignItems="center">
          <H1 textAlign="center" color="$color">
            🍅 Pomodoro Timer
          </H1>
          <Text textAlign="center" color="$color11" fontSize="$4">
            Stay focused with 25-minute work sessions
          </Text>
          <Text fontSize="$2" color="$color10" textAlign="center">
            Current theme: {isDarkMode ? 'Dark' : 'Light'} mode
          </Text>
        </YStack>

        {/* Timer Display */}
        <TimerDisplay formattedTime={timer.formattedTime} />

        {/* Timer Status */}
        <YStack alignItems="center" space="$2">
          <Text fontSize="$5" color="$color11" textAlign="center">
            {timer.isRunning ? '🔥 Focus time!' :
             timer.isPaused ? '⏸️ Paused' :
             '⏳ Ready to start'}
          </Text>
          {timer.timeLeft < 60 && timer.isRunning && (
            <Text fontSize="$3" color="$red10" textAlign="center">
              ⚡ Final minute!
            </Text>
          )}
        </YStack>

        {/* Timer Controls */}
        <TimerControls
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
          onStart={timer.start}
          onPause={timer.pause}
          onReset={timer.reset}
        />

        {/* Progress Bar */}
        <YStack width="100%" maxWidth={300} space="$2">
          <View
            height={8}
            backgroundColor="$color4"
            borderRadius="$2"
            overflow="hidden"
          >
            <View
              height="100%"
              backgroundColor="$blue10"
              width={`${((1500 - timer.timeLeft) / 1500) * 100}%`}
            />
          </View>
          <Text fontSize="$2" color="$color10" textAlign="center">
            {Math.round(((1500 - timer.timeLeft) / 1500) * 100)}% complete
          </Text>
        </YStack>

        {/* Quick Theme Toggle */}
        <Text
          fontSize="$2"
          color="$color9"
          textAlign="center"
          onPress={toggleTheme}
          style={{ textDecorationLine: 'underline' }}
        >
          Switch to {isDarkMode ? 'Light' : 'Dark'} mode
        </Text>
      </YStack>
    </View>
  );
}