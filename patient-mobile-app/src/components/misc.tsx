import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, spacing, type } from '../theme';

export function Badge({ label, tone = 'info' }: { label: string; tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral' }) {
  const map: Record<string, [string, string]> = {
    info: [colors.infoBg, colors.tealDark],
    success: [colors.successBg, colors.greenDeep],
    warning: [colors.warningBg, colors.warning],
    danger: [colors.dangerBg, colors.danger],
    neutral: [colors.paperDim, colors.slate],
  };
  const [bg, fg] = map[tone];
  return (
    <View style={[badgeStyles.wrap, { backgroundColor: bg }]}>
      <Text style={[type.caption, { color: fg, fontFamily: type.smallMedium.fontFamily }]}>{label}</Text>
    </View>
  );
}
const badgeStyles = StyleSheet.create({
  wrap: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
});

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === current ? 22 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === current ? colors.tealDark : colors.border,
          }}
        />
      ))}
    </View>
  );
}

export function IconCircle({
  name,
  size = 44,
  bg = colors.infoBg,
  color = colors.tealDark,
  iconSize,
}: {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  bg?: string;
  color?: string;
  iconSize?: number;
}) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={name} size={iconSize ?? size * 0.5} color={color} />
    </View>
  );
}

export function ListRow({
  icon,
  title,
  subtitle,
  right,
  onPress,
  danger,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [rowStyles.wrap, pressed && { opacity: 0.7 }]}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[type.bodyMedium, { color: danger ? colors.danger : colors.ink }]}>{title}</Text>
        {subtitle ? <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>{subtitle}</Text> : null}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-forward" size={18} color={colors.mist} /> : null)}
    </Pressable>
  );
}
const rowStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
});

export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.borderSoft }} />;
}

export function CheckRow({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={onToggle} style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 1.5,
          borderColor: checked ? colors.tealDark : colors.border,
          backgroundColor: checked ? colors.tealDark : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {checked ? <Ionicons name="checkmark" size={15} color={colors.white} /> : null}
      </View>
      <Text style={[type.small, { color: colors.ink2, flex: 1, lineHeight: 19 }]}>{children}</Text>
    </Pressable>
  );
}
