import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectAppointmentTime'>;

function nextDays(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

const SLOTS = ['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM'];
const MODES: Array<'Video Call' | 'In Person'> = ['Video Call', 'In Person'];

export default function SelectAppointmentTimeScreen({ navigation, route }: Props) {
  const { doctors } = useApp();
  const doctor = doctors.find((d) => d.id === route.params.doctorId);
  const days = nextDays(7);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [mode, setMode] = useState<'Video Call' | 'In Person'>('Video Call');

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Select a Time" subtitle={doctor?.name} />

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg }}>
        {MODES.map((m) => (
          <Pressable key={m} onPress={() => setMode(m)} style={[styles.modeChip, mode === m && styles.modeChipActive]}>
            <Ionicons name={m === 'Video Call' ? 'videocam-outline' : 'walk-outline'} size={16} color={mode === m ? colors.white : colors.ink2} />
            <Text style={[type.smallMedium, { color: mode === m ? colors.white : colors.ink2 }]}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.xl }}>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          {days.map((d, i) => (
            <Pressable key={i} onPress={() => setDayIndex(i)} style={[styles.dayBox, dayIndex === i && styles.dayBoxActive]}>
              <Text style={[type.caption, { color: dayIndex === i ? colors.white : colors.slate }]}>{d.toLocaleDateString(undefined, { weekday: 'short' })}</Text>
              <Text style={[type.title, { color: dayIndex === i ? colors.white : colors.ink, marginTop: 2 }]}>{d.getDate()}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Available Slots</Text>
      <View style={styles.slotGrid}>
        {SLOTS.map((s) => (
          <Pressable key={s} onPress={() => setSlot(s)} style={[styles.slot, slot === s && styles.slotActive]}>
            <Text style={[type.smallMedium, { color: slot === s ? colors.white : colors.ink2 }]}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Continue to Payment"
          disabled={!slot}
          onPress={() =>
            navigation.navigate('ConfirmBooking', {
              doctorId: doctor!.id,
              date: days[dayIndex].toDateString(),
              time: `${slot} · ${mode}`,
            })
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  modeChip: { flex: 1, flexDirection: 'row', gap: spacing.xs, alignItems: 'center', justifyContent: 'center', height: 46, borderRadius: radius.md, backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  modeChipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  dayBox: { width: 56, height: 68, borderRadius: radius.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  dayBoxActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slot: { paddingHorizontal: spacing.md, height: 42, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  slotActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
});
