import React from 'react';
import { StyleSheet, View, ViewStyle, Pressable } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevated?: boolean;
  padded?: boolean;
}

export default function Card({ children, style, onPress, elevated = true, padded = true }: Props) {
  const Wrapper: any = onPress ? Pressable : View;
  return (
    <Wrapper
      onPress={onPress}
      style={({ pressed }: any) => [
        styles.base,
        padded && { padding: spacing.lg },
        elevated && shadow.card,
        onPress && pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
});
