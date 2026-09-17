import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, shadow, spacing, type } from '../theme';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  onHide: () => void;
}

// The in-app pop-up notification (frame 33): a banner that drops from under
// the status bar, like a native push notification preview, auto-dismissing
// after a few seconds or on tap.
export default function InAppNotification({ visible, title, message, icon = 'notifications', onPress, onHide }: Props) {
  const translateY = useRef(new Animated.Value(-140)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 16 }).start();
      const t = setTimeout(() => hide(), 3500);
      return () => clearTimeout(t);
    } else {
      translateY.setValue(-140);
    }
  }, [visible]);

  const hide = () => {
    Animated.timing(translateY, { toValue: -140, duration: 200, useNativeDriver: true }).start(onHide);
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.wrap, { transform: [{ translateY }] }]} pointerEvents="box-none">
      <Pressable style={styles.card} onPress={() => { onPress?.(); hide(); }}>
        <View style={styles.iconBox}><Ionicons name={icon} size={16} color={colors.white} /></View>
        <View style={{ flex: 1 }}>
          <Text style={[type.smallMedium, { color: colors.ink }]}>{title}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 1 }]} numberOfLines={2}>{message}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 8, left: 0, right: 0, zIndex: 50, paddingHorizontal: spacing.lg },
  card: {
    flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', backgroundColor: colors.card,
    borderRadius: radius.lg, padding: spacing.md, ...shadow.float, borderWidth: 1, borderColor: colors.borderSoft,
  },
  iconBox: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center' },
});
