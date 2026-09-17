import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, spacing, type } from '../theme';

interface Props {
  title?: string;
  onBack?: () => void;
  right?: React.ReactNode;
  transparent?: boolean;
  subtitle?: string;
}

export default function Header({ title, onBack, right, transparent, subtitle }: Props) {
  return (
    <View style={[styles.wrap, transparent && { backgroundColor: 'transparent' }]}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.iconBtn} hitSlop={10}>
            <Ionicons name="chevron-back" size={22} color={colors.ink} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.center}>
        {title ? <Text style={[type.title, { color: colors.ink }]} numberOfLines={1}>{title}</Text> : null}
        {subtitle ? <Text style={[type.caption, { color: colors.slate }]}>{subtitle}</Text> : null}
      </View>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  side: { width: 56, justifyContent: 'center' },
  right: { alignItems: 'flex-end' },
  center: { flex: 1, alignItems: 'center' },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paperDim,
  },
});
