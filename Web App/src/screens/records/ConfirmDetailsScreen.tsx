import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { recordCategories } from '../../data/mockData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmDetails'>;

export default function ConfirmDetailsScreen({ navigation }: Props) {
  const { addRecord, activeProfileId } = useApp();
  const [processing, setProcessing] = useState(true);
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<typeof recordCategories[number]>('Lab Result');

  useEffect(() => {
    const t = setTimeout(() => {
      setProcessing(false);
      setTitle('Lipid Profile Test');
      setProvider('Chughtai Lab');
      setDate(new Date().toISOString().slice(0, 10));
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  if (processing) {
    return (
      <ScreenContainer scroll={false}>
        <Header onBack={() => navigation.goBack()} title="Reading Document" />
        <View style={styles.processingWrap}>
          <View style={styles.scanLineTrack}>
            <View style={styles.docPreview}>
              <Ionicons name="document-text-outline" size={48} color={colors.mist} />
            </View>
          </View>
          <Text style={[type.title, { color: colors.ink, marginTop: spacing.xl }]}>Extracting details…</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs, textAlign: 'center' }]}>
            Our on-device OCR is reading the title, provider, and date from your scan.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Confirm Details" />

      <View style={styles.thumbRow}>
        <View style={styles.thumb}>
          <Ionicons name="document-text-outline" size={28} color={colors.tealDark} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[type.smallMedium, { color: colors.success }]}>✓ Text extracted successfully</Text>
          <Text style={[type.caption, { color: colors.slate }]}>Review the details below before saving</Text>
        </View>
      </View>

      <Input label="Title" value={title} onChangeText={setTitle} containerStyle={{ marginBottom: spacing.lg }} />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Category</Text>
      <View style={styles.chipRow}>
        {recordCategories.map((c) => (
          <Pressable key={c} onPress={() => setCategory(c)} style={[styles.chip, category === c && styles.chipActive]}>
            <Text style={[type.small, { color: category === c ? colors.white : colors.ink2 }]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Input label="Provider / Hospital" value={provider} onChangeText={setProvider} containerStyle={{ marginVertical: spacing.lg }} />
      <Input label="Date" value={date} onChangeText={setDate} />

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Save to Timeline"
          onPress={() => {
            const id = `r${Date.now()}`;
            addRecord({
              id, profileId: activeProfileId, title, category, provider, date,
              summary: 'Saved from scanned document.', tags: [category], hasPhoto: true,
            });
            navigation.navigate('RecordDetail', { recordId: id });
          }}
        />
        <View style={{ height: spacing.md }} />
        <Button label="Add Voice Note Instead" variant="ghost" onPress={() => navigation.navigate('AddVoiceNote', {})} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  processingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl },
  scanLineTrack: { width: 180, height: 220, borderRadius: radius.lg, backgroundColor: colors.paperDim, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  docPreview: { width: 140, height: 180, borderRadius: radius.md, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  thumbRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', marginBottom: spacing.xl },
  thumb: { width: 56, height: 56, borderRadius: radius.md, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
});
