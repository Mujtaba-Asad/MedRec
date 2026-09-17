import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing, type } from '../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'md' | 'lg' | 'sm';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  icon,
  trailingIcon,
  fullWidth = true,
  style,
}: Props) {
  const height = size === 'lg' ? 56 : size === 'sm' ? 40 : 50;
  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.tealDark} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              type.button,
              styles.label,
              variant === 'primary' && { color: colors.onBrand },
              variant === 'secondary' && { color: colors.ink },
              variant === 'outline' && { color: colors.ink },
              variant === 'ghost' && { color: colors.tealDark },
              variant === 'danger' && { color: colors.danger },
              size === 'sm' && { fontSize: 14 },
            ]}
          >
            {label}
          </Text>
          {trailingIcon}
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          { opacity: disabled ? 0.5 : pressed ? 0.9 : 1, width: fullWidth ? '100%' : undefined },
          style,
        ]}
      >
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, { height, borderRadius: radius.pill }]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        { height, borderRadius: radius.pill, width: fullWidth ? '100%' : undefined },
        variant === 'secondary' && { backgroundColor: colors.paperDim },
        variant === 'outline' && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.border },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        variant === 'danger' && { backgroundColor: colors.dangerBg },
        { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  label: {
    textAlign: 'center',
  },
});
