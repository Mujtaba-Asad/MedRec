import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Medications'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function MedicationsScreen({ navigation }: Props) {
  const { medications, toggleMedTaken, activeProfileId } = useApp();
  const mine = medications.filter((m) => m.profileId === activeProfileId);
  const allTimes = Array.from(new Set(mine.flatMap((m) => m.times))).sort();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[type.h2, { color: colors.ink, marginBottom: spacing.xs }]}>Medications</Text>
        <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>Today's schedule, reminders included.</Text>

        {allTimes.map((time) => {
          const meds = mine.filter((m) => m.times.includes(time));
          return (
            <View key={time} style={{ marginBottom: spacing.xl }}>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={16} color={colors.slate} />
                <Text style={[type.smallMedium, { color: colors.slate }]}>{time}</Text>
              </View>
              {meds.map((m) => (
                <Card key={m.id} style={{ marginTop: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
                  <View style={[styles.pill, { backgroundColor: m.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={[type.bodyMedium, { color: colors.ink }]}>{m.name} {m.dosage}</Text>
                    <Text style={[type.small, { color: colors.slate }]}>{m.instructions ?? m.frequency}</Text>
                  </View>
                  <Pressable
                    onPress={() => toggleMedTaken(m.id, time)}
                    style={[styles.checkBtn, m.taken[time] && styles.checkBtnDone]}
                  >
                    <Ionicons name={m.taken[time] ? 'checkmark' : 'ellipse-outline'} size={18} color={m.taken[time] ? colors.white : colors.mist} />
                  </Pressable>
                </Card>
              ))}
            </View>
          );
        })}

        <Text style={[type.title, { color: colors.ink, marginBottom: spacing.md }]}>All Medications</Text>
        {mine.map((m) => (
          <Card
            key={`all-${m.id}`}
            style={{ marginBottom: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
            onPress={() => navigation.navigate('LockScreenReminder', { medicationId: m.id })}
          >
            <View style={[styles.pill, { backgroundColor: m.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={[type.bodyMedium, { color: colors.ink }]}>{m.name}</Text>
              <Text style={[type.small, { color: colors.slate }]}>{m.dosage} · {m.frequency}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mist} />
          </Card>
        ))}

        {mine.length === 0 && (
          <Text style={[type.body, { color: colors.slate, textAlign: 'center', marginVertical: spacing.xxl }]}>
            No medications added yet.
          </Text>
        )}

        <View style={{ marginTop: spacing.lg }}>
          <Button label="Add Medication" icon={<Ionicons name="add" size={18} color={colors.white} />} onPress={() => navigation.navigate('AddMedication')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: 120 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs },
  pill: { width: 8, height: 40, borderRadius: 4 },
  checkBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paperDim },
  checkBtnDone: { backgroundColor: colors.success },
});
