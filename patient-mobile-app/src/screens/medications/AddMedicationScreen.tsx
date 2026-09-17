import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMedication'>;

const FREQUENCIES = [
  { label: 'Once daily', times: ['09:00'] },
  { label: 'Twice daily', times: ['08:00', '20:00'] },
  { label: 'Three times daily', times: ['08:00', '14:00', '20:00'] },
  { label: 'As needed', times: [] as string[] },
];
const COLORS = ['#2DA6B2', '#43C871', '#D98C2B', '#D64545', '#8E6FCB'];

export default function AddMedicationScreen({ navigation }: Props) {
  const { addMedication, activeProfileId } = useApp();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [freqIndex, setFreqIndex] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const canSave = name.trim().length > 1 && dosage.trim().length > 0;

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Add Medication" />

      <Input label="Medication Name" placeholder="e.g. Metformin" value={name} onChangeText={setName} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Dosage" placeholder="e.g. 500mg" value={dosage} onChangeText={setDosage} containerStyle={{ marginBottom: spacing.lg }} />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Frequency</Text>
      <View style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
        {FREQUENCIES.map((f, i) => (
          <Pressable key={f.label} onPress={() => setFreqIndex(i)} style={[styles.freqRow, freqIndex === i && styles.freqRowActive]}>
            <Ionicons name={freqIndex === i ? 'radio-button-on' : 'radio-button-off'} size={18} color={freqIndex === i ? colors.tealDark : colors.mist} />
            <Text style={[type.body, { color: colors.ink }]}>{f.label}</Text>
            {f.times.length > 0 && <Text style={[type.caption, { color: colors.slate, marginLeft: 'auto' }]}>{f.times.join(', ')}</Text>}
          </Pressable>
        ))}
      </View>

      <Input label="Instructions (optional)" placeholder="e.g. Take after meals" value={instructions} onChangeText={setInstructions} containerStyle={{ marginBottom: spacing.lg }} />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Reminder Color</Text>
      <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl }}>
        {COLORS.map((c) => (
          <Pressable key={c} onPress={() => setColor(c)} style={[styles.swatch, { backgroundColor: c }, color === c && styles.swatchActive]} />
        ))}
      </View>

      <Button
        label="Save Medication"
        disabled={!canSave}
        onPress={() => {
          const times = FREQUENCIES[freqIndex].times;
          const taken: Record<string, boolean> = {};
          times.forEach((t) => (taken[t] = false));
          addMedication({
            id: `m${Date.now()}`, profileId: activeProfileId, name, dosage,
            frequency: FREQUENCIES[freqIndex].label, times, startDate: new Date().toISOString().slice(0,10),
            color, taken, instructions,
          });
          navigation.goBack();
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  freqRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card },
  freqRowActive: { borderColor: colors.tealDark, backgroundColor: colors.infoBg },
  swatch: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'transparent' },
  swatchActive: { borderColor: colors.ink },
});
