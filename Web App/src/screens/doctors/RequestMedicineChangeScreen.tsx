import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { ConfirmDialog } from '../../components/Dialog';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestMedicineChange'>;

const REASONS = ['Side effects', "Not working as expected", 'Ran out early', 'Cost / availability', 'Other'];

export default function RequestMedicineChangeScreen({ navigation, route }: Props) {
  const { doctors, medications, activeProfileId } = useApp();
  const doctor = doctors.find((d) => d.id === route.params?.doctorId) ?? doctors.find((d) => d.connected);
  const myMeds = medications.filter((m) => m.profileId === activeProfileId);
  const [medId, setMedId] = useState(myMeds[0]?.id ?? '');
  const [reason, setReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Request Medicine Change" subtitle={doctor?.name} />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Which medication?</Text>
      <View style={{ gap: spacing.sm, marginBottom: spacing.xl }}>
        {myMeds.map((m) => (
          <Pressable key={m.id} onPress={() => setMedId(m.id)} style={[styles.optRow, medId === m.id && styles.optRowActive]}>
            <View style={[styles.dot, { backgroundColor: m.color }]} />
            <Text style={[type.body, { color: colors.ink, flex: 1 }]}>{m.name} {m.dosage}</Text>
            <Ionicons name={medId === m.id ? 'radio-button-on' : 'radio-button-off'} size={18} color={medId === m.id ? colors.tealDark : colors.mist} />
          </Pressable>
        ))}
      </View>

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Reason</Text>
      <View style={styles.chipRow}>
        {REASONS.map((r) => (
          <Pressable key={r} onPress={() => setReason(r)} style={[styles.chip, reason === r && styles.chipActive]}>
            <Text style={[type.small, { color: reason === r ? colors.white : colors.ink2 }]}>{r}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Add any details for your doctor…"
        placeholderTextColor={colors.mist}
        multiline
        numberOfLines={4}
        value={notes}
        onChangeText={setNotes}
        style={styles.textarea}
      />

      <View style={{ marginTop: spacing.xxl }}>
        <Button label="Send Request" disabled={!medId} onPress={() => setSent(true)} />
      </View>

      <ConfirmDialog
        visible={sent}
        tone="success"
        title="Request Sent"
        message={`${doctor?.name ?? 'Your doctor'} will review your request and respond within 24 hours.`}
        confirmLabel="Done"
        cancelLabel="View Prescription"
        onConfirm={() => navigation.goBack()}
        onCancel={() => navigation.replace('Prescription', {})}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  optRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card },
  optRowActive: { borderColor: colors.tealDark, backgroundColor: colors.infoBg },
  dot: { width: 10, height: 10, borderRadius: 5 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  textarea: { height: 100, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card, padding: spacing.md, color: colors.ink, textAlignVertical: 'top' },
});
