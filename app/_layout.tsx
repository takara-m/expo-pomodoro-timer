import '../tamagui-web.css';

import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import { useEffect, createContext, useContext, useState } from 'react';
import { TamaguiProvider } from 'tamagui';

import { tamaguiConfig } from '../tamagui.config';

// テーマコンテキストを作成
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      // Hide splash screen here if needed
    }
  }, [loaded]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={isDarkMode ? 'dark' : 'light'}
      >
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
        </Stack>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
}
