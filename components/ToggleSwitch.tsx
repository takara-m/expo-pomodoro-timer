import { useState } from 'react';
import { Pressable, Animated } from 'react-native';
import { View, Text, XStack } from 'tamagui';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
  disabled?: boolean;
  label?: string;
}

export const ToggleSwitch = ({
  value,
  onValueChange,
  size = 'medium',
  activeColor = '#4CD964',
  inactiveColor = '#E5E5EA',
  disabled = false,
  label,
}: ToggleSwitchProps) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const getSizes = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 24, thumbSize: 20, padding: 2 };
      case 'large':
        return { width: 60, height: 36, thumbSize: 32, padding: 2 };
      default:
        return { width: 50, height: 30, thumbSize: 26, padding: 2 };
    }
  };

  const sizes = getSizes();

  const handlePress = () => {
    if (disabled) return;

    const newValue = !value;
    onValueChange(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [sizes.padding, sizes.width - sizes.thumbSize - sizes.padding],
  });

  const switchComponent = (
    <Pressable onPress={handlePress} disabled={disabled}>
      <View
        width={sizes.width}
        height={sizes.height}
        borderRadius={sizes.height / 2}
        backgroundColor={value ? activeColor : inactiveColor}
        padding={sizes.padding}
        justifyContent='center'
        opacity={disabled ? 0.5 : 1}
      >
        <Animated.View
          style={{
            width: sizes.thumbSize,
            height: sizes.thumbSize,
            borderRadius: sizes.thumbSize / 2,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 3,
            transform: [{ translateX: thumbTranslateX }],
          }}
        />
      </View>
    </Pressable>
  );

  if (label) {
    return (
      <XStack alignItems='center' space='$3'>
        <Text color='$color' fontSize='$4'>
          {label}
        </Text>
        {switchComponent}
      </XStack>
    );
  }

  return switchComponent;
};
