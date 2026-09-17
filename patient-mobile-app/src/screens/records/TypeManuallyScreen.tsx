import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { recordCategories } from '../../data/mockData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TypeManually'>;

export default function TypeManuallyScreen({ navigation }: Props) {
  const { addRecord, activeProfileId } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<typeof recordCategories[number]>('Other');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const canSave = title.trim().length > 1;

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Type Manually" />
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        No document to scan? Add the details yourself — it'll appear in your timeline just the same.
      </Text>

      <Input label="Title" placeholder="e.g. Dentist Visit" value={title} onChangeText={setTitle} containerStyle={{ marginBottom: spacing.lg }} />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Category</Text>
      <View style={styles.chipRow}>
        {recordCategories.map((c) => (
          <Pressable key={c} onPress={() => setCategory(c)} style={[styles.chip, category === c && styles.chipActive]}>
            <Text style={[type.small, { color: category === c ? colors.white : colors.ink2 }]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Input label="Provider / Hospital" placeholder="e.g. City Dental Clinic" value={provider} onChangeText={setProvider} containerStyle={{ marginVertical: spacing.lg }} />
      <Input label="Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Notes" placeholder="Anything you want to remember" value={notes} onChangeText={setNotes} multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top', paddingTop: spacing.md }} />

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Save Record"
          disabled={!canSave}
          onPress={() => {
            const id = `r${Date.now()}`;
            addRecord({ id, profileId: activeProfileId, title, category, provider, date: date || new Date().toISOString().slice(0,10), summary: notes || 'Added manually.', tags: [category], hasPhoto: false });
            navigation.navigate('RecordDetail', { recordId: id });
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
});
