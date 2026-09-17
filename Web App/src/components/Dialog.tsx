import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, shadow, spacing, type } from '../theme';
import Button from './Button';
import { IconCircle } from './misc';

interface ConfirmProps {
  visible: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  tone?: 'danger' | 'success' | 'info';
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible, icon, tone = 'danger', title, message, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel,
}: ConfirmProps) {
  const toneMap = {
    danger: { bg: colors.dangerBg, fg: colors.danger, ic: icon ?? 'trash-outline' as const },
    success: { bg: colors.successBg, fg: colors.success, ic: icon ?? 'checkmark-circle-outline' as const },
    info: { bg: colors.infoBg, fg: colors.tealDark, ic: icon ?? 'information-circle-outline' as const },
  }[tone];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <IconCircle name={toneMap.ic} bg={toneMap.bg} color={toneMap.fg} size={56} iconSize={26} />
          <Text style={[type.h3, { color: colors.ink, marginTop: spacing.lg, textAlign: 'center' }]}>{title}</Text>
          <Text style={[type.body, { color: colors.slate, marginTop: spacing.sm, textAlign: 'center' }]}>{message}</Text>
          <View style={{ width: '100%', marginTop: spacing.xl, gap: spacing.sm }}>
            <Button
              label={confirmLabel}
              variant={tone === 'danger' ? 'danger' : 'primary'}
              onPress={onConfirm}
            />
            <Button label={cancelLabel} variant="ghost" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function Toast({ visible, message, onHide }: { visible: boolean; message: string; onHide: () => void }) {
  React.useEffect(() => {
    if (visible) {
      const t = setTimeout(onHide, 2200);
      return () => clearTimeout(t);
    }
  }, [visible]);
  if (!visible) return null;
  return (
    <View style={styles.toastWrap} pointerEvents="none">
      <View style={styles.toast}>
        <Ionicons name="checkmark-circle" size={18} color={colors.success} />
        <Text style={[type.smallMedium, { color: colors.white, flex: 1 }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(15,19,23,0.55)', alignItems: 'center', justifyContent: 'center', padding: spacing.xxl },
  card: {
    width: '100%', maxWidth: 360, backgroundColor: colors.card, borderRadius: radius.lg,
    padding: spacing.xxl, alignItems: 'center', ...shadow.float,
  },
  toastWrap: { position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center' },
  toast: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.ink,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.pill, maxWidth: '90%',
  },
});
