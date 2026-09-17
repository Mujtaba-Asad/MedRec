import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, radius, shadow, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'LockScreenReminder'>;

export default function LockScreenReminderScreen({ navigation, route }: Props) {
  const { medications, toggleMedTaken } = useApp();
  const med = medications.find((m) => m.id === route.params.medicationId);
  const time = med?.times[0] ?? '08:00';
  const now = new Date();

  return (
    <View style={styles.wrap}>
      <View style={styles.topArea}>
        <Text style={styles.clock}>{now.getHours().toString().padStart(2,'0')}:{now.getMinutes().toString().padStart(2,'0')}</Text>
        <Text style={styles.date}>{now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
      </View>

      {med && (
        <View style={styles.notification}>
          <View style={styles.notifHeader}>
            <View style={[styles.appIcon, { backgroundColor: med.color }]}>
              <Ionicons name="medkit" size={14} color={colors.white} />
            </View>
            <Text style={[type.caption, { color: colors.slate, flex: 1 }]}>MEDREC · NOW</Text>
          </View>
          <Text style={[type.title, { color: colors.ink, marginTop: spacing.xs }]}>Time for {med.name}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>{med.dosage} — {med.instructions ?? med.frequency}</Text>
          <View style={styles.actionsRow}>
            <Pressable style={[styles.actionBtn, styles.snooze]} onPress={() => navigation.goBack()}>
              <Text style={[type.smallMedium, { color: colors.ink2 }]}>Snooze 15m</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, styles.take]}
              onPress={() => { toggleMedTaken(med.id, time); navigation.goBack(); }}
            >
              <Ionicons name="checkmark" size={16} color={colors.white} />
              <Text style={[type.smallMedium, { color: colors.white }]}>Mark Taken</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Pressable style={styles.dismiss} onPress={() => navigation.goBack()}>
        <Text style={[type.small, { color: 'rgba(255,255,255,0.7)' }]}>Tap to unlock</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.xxxl },
  topArea: { alignItems: 'center', marginTop: spacing.xxxl },
  clock: { color: colors.white, fontSize: 64, fontFamily: type.h1.fontFamily },
  date: { color: 'rgba(255,255,255,0.7)', ...type.body, marginTop: spacing.xs },
  notification: {
    width: '88%', backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: radius.lg,
    padding: spacing.lg, ...shadow.float,
  },
  notifHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  appIcon: { width: 22, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  actionsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  actionBtn: { flex: 1, height: 42, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  snooze: { backgroundColor: colors.paperDim },
  take: { backgroundColor: colors.success },
  dismiss: { marginBottom: spacing.xl },
});
