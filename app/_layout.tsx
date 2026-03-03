import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';
import 'react-native-reanimated';

// Importar os hooks de fonte e as variações que vamos usar
import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_700Bold, 
  Poppins_900Black 
} from '@expo-google-fonts/poppins';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';

// Impede a tela de splash de sumir sozinha antes do tempo
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Carregar as variações da Poppins e dar apelidos para usar no CSS
  const [loaded, error] = useFonts({
    'Poppins': Poppins_400Regular,
    'PoppinsSemiBold': Poppins_600SemiBold,
    'PoppinsBold': Poppins_700Bold,
    'PoppinsBlack': Poppins_900Black,
  });

  useEffect(() => {
    // Quando carregar (loaded=true) ou der erro, esconde a splash screen
    if (loaded || error) {
      SplashScreen.hideAsync(); 
      if (error) {
        console.error("Erro crítico ao carregar fontes Poppins:", error);
      }
    }
  }, [loaded, error]);

  // Se as fontes não carregaram e não houve erro ainda, mantém a splash travada
  // Isso evita que o app abra com a fonte errada
  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // Remove cabeçalhos nativos de todas as telas
        }}
      >
        {/* Navegação por abas (Principal) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Tela de Login (Modal) */}
        <Stack.Screen 
          name="login" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}