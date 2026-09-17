import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { ProgressDots } from '../../components/misc';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'HealthBasics'>;

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

function ChipInput({ items, onAdd, onRemove, placeholder }: { items: string[]; onAdd: (v: string) => void; onRemove: (v: string) => void; placeholder: string }) {
  const [text, setText] = useState('');
  return (
    <View>
      <View style={styles.chipWrap}>
        {items.map((item) => (
          <View key={item} style={styles.tag}>
            <Text style={[type.small, { color: colors.ink2 }]}>{item}</Text>
            <Pressable onPress={() => onRemove(item)} hitSlop={8}>
              <Ionicons name="close" size={14} color={colors.slate} />
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.addRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={colors.mist}
          style={styles.addInput}
          onSubmitEditing={() => {
            if (text.trim()) { onAdd(text.trim()); setText(''); }
          }}
        />
        <Pressable
          style={styles.addBtn}
          onPress={() => { if (text.trim()) { onAdd(text.trim()); setText(''); } }}
        >
          <Ionicons name="add" size={18} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

export default function HealthBasicsScreen({ navigation }: Props) {
  const { profile, updateProfile } = useApp();
  const [bloodType, setBloodType] = useState(profile.bloodType);
  const [allergies, setAllergies] = useState<string[]>(profile.allergies);
  const [conditions, setConditions] = useState<string[]>(profile.conditions);

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Set Up Profile" />
      <View style={{ marginVertical: spacing.lg }}>
        <ProgressDots total={3} current={1} />
      </View>
      <Text style={[type.h3, { color: colors.ink, marginBottom: spacing.xs }]}>Health basics</Text>
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        Critical info for emergencies — you can always add more later.
      </Text>

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Blood Type</Text>
      <View style={styles.bloodGrid}>
        {BLOOD_TYPES.map((bt) => (
          <Pressable key={bt} onPress={() => setBloodType(bt)} style={[styles.bloodChip, bloodType === bt && styles.chipActive]}>
            <Text style={[type.smallMedium, { color: bloodType === bt ? colors.white : colors.ink2 }]}>{bt}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[type.smallMedium, { color: colors.ink2, marginTop: spacing.xl, marginBottom: spacing.xs }]}>Known Allergies</Text>
      <ChipInput items={allergies} onAdd={(v) => setAllergies((a) => [...a, v])} onRemove={(v) => setAllergies((a) => a.filter((x) => x !== v))} placeholder="e.g. Penicillin" />

      <Text style={[type.smallMedium, { color: colors.ink2, marginTop: spacing.xl, marginBottom: spacing.xs }]}>Chronic Conditions</Text>
      <ChipInput items={conditions} onAdd={(v) => setConditions((c) => [...c, v])} onRemove={(v) => setConditions((c) => c.filter((x) => x !== v))} placeholder="e.g. Type 2 Diabetes" />

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Continue"
          disabled={!bloodType}
          onPress={() => {
            updateProfile({ bloodType, allergies, conditions });
            navigation.navigate('EmergencyContact');
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bloodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  bloodChip: {
    width: 64, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.infoBg,
    paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.pill,
  },
  addRow: { flexDirection: 'row', gap: spacing.sm },
  addInput: {
    flex: 1, height: 46, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.card, paddingHorizontal: spacing.md, color: colors.ink,
  },
  addBtn: { width: 46, height: 46, borderRadius: radius.md, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center' },
});
