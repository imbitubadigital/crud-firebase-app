import React from 'react';

import {StatusBar} from 'expo-status-bar';
import {ThemeProvider} from 'styled-components/native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

import {Routes} from './src/routes';
import theme from './src/theme';
import {Loading} from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" />
      <Routes />
    </ThemeProvider>
  );
}
