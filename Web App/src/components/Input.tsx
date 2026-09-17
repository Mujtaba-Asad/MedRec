import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface Props extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export default function Input({ label, hint, error, leftIcon, rightIcon, containerStyle, style, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          focused && styles.focused,
          error && styles.errorBorder,
        ]}
      >
        {leftIcon}
        <TextInput
          placeholderTextColor={colors.mist}
          style={[type.body, styles.input, style]}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          {...rest}
        />
        {rightIcon}
      </View>
      {error ? <Text style={[type.small, { color: colors.danger, marginTop: spacing.xs }]}>{error}</Text> : null}
      {hint && !error ? <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs }]}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 52,
  },
  focused: { borderColor: colors.teal },
  errorBorder: { borderColor: colors.danger },
  input: { flex: 1, color: colors.ink, height: '100%' },
});
