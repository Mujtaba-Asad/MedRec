import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  background?: string;
  edges?: Edge[];
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export default function ScreenContainer({
  children,
  scroll = true,
  padded = true,
  background = colors.paper,
  // Bottom is included by default: most screens built on ScreenContainer are
  // plain stack screens with nothing else below them, so without this their
  // last scrollable item / a pinned footer button can end up sitting under
  // the iOS home-indicator / Android gesture bar. The 4 screens that live
  // inside the bottom tab navigator render their own SafeAreaView directly
  // (see MainTabs.tsx's screens) rather than going through this component,
  // so they're unaffected — the custom tab bar underneath them already
  // reserves that space.
  edges = ['top', 'left', 'right', 'bottom'],
  style,
  contentStyle,
}: Props) {
  const inner = (
    <View style={[padded && styles.padded, contentStyle]}>{children}</View>
  );
  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: background }, style]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing.xxxl }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {inner}
          </ScrollView>
        ) : (
          inner
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  padded: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
});
