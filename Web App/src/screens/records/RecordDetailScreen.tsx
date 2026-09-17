import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Badge, Divider, IconCircle } from '../../components/misc';
import { ConfirmDialog, Toast } from '../../components/Dialog';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecordDetail'>;

export default function RecordDetailScreen({ navigation, route }: Props) {
  const { recordId } = route.params;
  const { records, toggleStar, removeRecord } = useApp();
  const record = records.find((r) => r.id === recordId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toast, setToast] = useState(false);

  if (!record) {
    return (
      <ScreenContainer>
        <Header onBack={() => navigation.goBack()} title="Record" />
        <Text style={[type.body, { color: colors.slate }]}>This record was removed.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        title={record.category}
        right={
          <Pressable onPress={() => toggleStar(record.id)} hitSlop={8}>
            <Ionicons name={record.starred ? 'star' : 'star-outline'} size={20} color={record.starred ? colors.warning : colors.ink} />
          </Pressable>
        }
      />

      <View style={styles.iconWrap}>
        <IconCircle name="document-text-outline" size={64} iconSize={30} />
      </View>

      <Text style={[type.h2, { color: colors.ink, textAlign: 'center' }]}>{record.title}</Text>
      <Text style={[type.small, { color: colors.slate, textAlign: 'center', marginTop: spacing.xs }]}>{record.provider}</Text>

      <View style={{ flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginVertical: spacing.lg }}>
        <Badge label={record.category} tone="info" />
        <Badge label={record.date} tone="neutral" />
      </View>

      <Card style={{ marginBottom: spacing.lg }}>
        <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Summary</Text>
        <Text style={[type.body, { color: colors.ink }]}>{record.summary}</Text>
        {record.tags.length > 0 && (
          <View style={{ flexDirection: 'row', gap: spacing.xs, marginTop: spacing.md, flexWrap: 'wrap' }}>
            {record.tags.map((t) => <Badge key={t} label={t} tone="neutral" />)}
          </View>
        )}
      </Card>

      {record.hasPhoto && (
        <Card
          style={{ marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
          onPress={() => navigation.navigate('ViewRecord', { recordId: record.id })}
        >
          <IconCircle name="image-outline" />
          <View style={{ flex: 1 }}>
            <Text style={[type.bodyMedium, { color: colors.ink }]}>Original Document</Text>
            <Text style={[type.small, { color: colors.slate }]}>View scanned photo & extracted text</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.mist} />
        </Card>
      )}

      {record.hasVoiceNote && (
        <Card
          style={{ marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
          onPress={() => navigation.navigate('AddVoiceNote', { recordId: record.id })}
        >
          <IconCircle name="mic-outline" bg={colors.successBg} color={colors.success} />
          <View style={{ flex: 1 }}>
            <Text style={[type.bodyMedium, { color: colors.ink }]}>Voice Note</Text>
            <Text style={[type.small, { color: colors.slate }]}>0:42 — Doctor's follow-up instructions</Text>
          </View>
          <Ionicons name="play-circle-outline" size={26} color={colors.tealDark} />
        </Card>
      )}

      <Divider />

      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
        <Button label="Share" variant="secondary" icon={<Ionicons name="share-outline" size={18} color={colors.ink} />} onPress={() => setToast(true)} style={{ flex: 1 }} />
        <Button label="Delete" variant="danger" icon={<Ionicons name="trash-outline" size={18} color={colors.danger} />} onPress={() => setConfirmDelete(true)} style={{ flex: 1 }} />
      </View>

      <ConfirmDialog
        visible={confirmDelete}
        tone="danger"
        title="Delete this record?"
        message={`"${record.title}" will be permanently removed from ${'this device'}. This can't be undone.`}
        confirmLabel="Delete Record"
        onConfirm={() => { removeRecord(record.id); navigation.goBack(); }}
        onCancel={() => setConfirmDelete(false)}
      />
      <Toast visible={toast} message="Link copied — expires in 24 hours" onHide={() => setToast(false)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: 'center', marginVertical: spacing.lg },
});
