import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { CheckRow } from '../../components/misc';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { recordCategories } from '../../data/mockData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ShareProfileChoose'>;

export default function ShareProfileChooseScreen({ navigation }: Props) {
  const { records, activeProfileId } = useApp();
  const [selected, setSelected] = useState<string[]>(['emergency']);
  const mine = records.filter((r) => r.profileId === activeProfileId);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Share Profile" />
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        Choose what to include. Shared links expire after 24 hours and are view-only.
      </Text>

      <View style={styles.section}>
        <CheckRow checked={selected.includes('emergency')} onToggle={() => toggle('emergency')}>
          Emergency profile (blood type, allergies, emergency contact)
        </CheckRow>
      </View>
      <View style={styles.section}>
        <CheckRow checked={selected.includes('all-records')} onToggle={() => toggle('all-records')}>
          All {mine.length} medical records
        </CheckRow>
      </View>
      <View style={styles.section}>
        <CheckRow checked={selected.includes('meds')} onToggle={() => toggle('meds')}>
          Current medications
        </CheckRow>
      </View>

      <Text style={[type.smallMedium, { color: colors.ink2, marginTop: spacing.lg, marginBottom: spacing.sm }]}>Or choose specific categories</Text>
      <View style={styles.chipRow}>
        {recordCategories.map((c) => (
          <Pressable key={c} onPress={() => toggle(c)} style={[styles.chip, selected.includes(c) && styles.chipActive]}>
            <Text style={[type.small, { color: selected.includes(c) ? colors.white : colors.ink2 }]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Generate Share Link"
          icon={<Ionicons name="qr-code-outline" size={18} color={colors.white} />}
          disabled={selected.length === 0}
          onPress={() => navigation.navigate('ShareProfileQR')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: { paddingVertical: spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
});
