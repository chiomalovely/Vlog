import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = Colors[colorScheme ?? 'light'];
  
  return {
    colors,
    isDark,
    colorScheme,
  };
}