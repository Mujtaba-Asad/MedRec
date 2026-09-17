import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
// Deep-import each weight's own submodule (not the package index) so the
// bundler only pulls in the ~4 font files we actually use instead of all 18
// weights + italics each package ships — this alone cuts several MB from
// the web build.
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display/600SemiBold';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display/700Bold';

import { AppProvider, useApp } from './src/data/AppContext';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingScreen from './src/screens/system/LoadingScreen';
import { colors } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

// RootNavigator reads `profile.onboardingComplete` only once, to pick
// `initialRouteName` — React Navigation doesn't re-evaluate that prop after
// the navigator has mounted. AppProvider's persisted state loads
// asynchronously (AsyncStorage), so if NavigationContainer mounted right
// away it would always capture the pre-hydration default (onboardingComplete:
// false) and send a returning user back through onboarding on every reload,
// even though their saved profile says they finished it. Holding
// NavigationContainer until `hydrated` is true (behind the same splash/loading
// screen already used for font loading) makes sure it always mounts with the
// real, persisted profile.
function AppShell({ onLayoutRootView }: { onLayoutRootView: () => void }) {
  const { hydrated } = useApp();
  return (
    <View style={styles.flex} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      {hydrated ? (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      ) : (
        <LoadingScreen label="Preparing MedRec…" />
      )}
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <LoadingScreen label="Preparing MedRec…" />;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppShell onLayoutRootView={onLayoutRootView} />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.paper },
});
