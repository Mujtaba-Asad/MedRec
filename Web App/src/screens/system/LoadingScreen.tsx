import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../../theme';

// Frame 32 — Loading / Processing. Reused as the app's own boot splash while
// fonts and locally-stored data are hydrated, and anywhere else a full-screen
// wait is needed.
export default function LoadingScreen({ label = 'Loading your records…' }: { label?: string }) {
  return (
    <View style={styles.wrap}>
      <Image source={require('../../../assets/brand/logo.png')} style={styles.logo} resizeMode="contain" />
      <ActivityIndicator color={colors.tealDark} style={{ marginTop: spacing.xl }} />
      <Text style={[type.small, { color: colors.slate, marginTop: spacing.md }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 120, height: 90 },
});
