import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Card from '../../components/Card';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { Doctor } from '../../data/types';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Doctors'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SPECIALTIES = ['All', 'Cardiologist', 'General Physician', 'Pediatrician', 'Dermatologist'];

function DoctorCard({ doctor, onPress }: { doctor: Doctor; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={{ marginBottom: spacing.md }}>
      <View style={styles.row}>
        <View style={[styles.avatar, { backgroundColor: doctor.avatarColor }]}>
          <Text style={styles.avatarText}>{doctor.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>{doctor.name}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>{doctor.specialty} · {doctor.hospital}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={12} color={colors.warning} />
            <Text style={[type.caption, { color: colors.ink2 }]}>{doctor.rating} ({doctor.reviews})</Text>
            <Text style={[type.caption, { color: colors.mist }]}>· {doctor.distanceKm} km</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>Rs {doctor.fee}</Text>
          <Text style={[type.caption, { color: colors.success, marginTop: 2 }]}>{doctor.nextAvailable}</Text>
        </View>
      </View>
    </Card>
  );
}

export default function FindDoctorScreen({ navigation }: Props) {
  const { doctors } = useApp();
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');

  const filtered = useMemo(
    () =>
      doctors
        .filter((d) => (specialty === 'All' ? true : d.specialty === specialty))
        .filter((d) => (query ? d.name.toLowerCase().includes(query.toLowerCase()) : true)),
    [doctors, specialty, query]
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <FlatList
        data={filtered}
        keyExtractor={(d) => d.id}
        contentContainerStyle={{ padding: spacing.xl, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={[type.h2, { color: colors.ink, marginBottom: spacing.xs }]}>Find a Doctor</Text>
            <Text style={[type.body, { color: colors.slate, marginBottom: spacing.lg }]}>Book a video or in-person consultation.</Text>
            <Input
              placeholder="Search doctors, specialties…"
              value={query}
              onChangeText={setQuery}
              leftIcon={<Ionicons name="search" size={18} color={colors.mist} />}
              containerStyle={{ marginBottom: spacing.md }}
            />
            <View style={styles.chipsRow}>
              {SPECIALTIES.map((s) => (
                <Pressable key={s} onPress={() => setSpecialty(s)} style={[styles.chip, specialty === s && styles.chipActive]}>
                  <Text style={[type.smallMedium, { color: specialty === s ? colors.white : colors.ink2 }]}>{s}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.connectionsRow} onPress={() => navigation.navigate('DoctorConnections')}>
              <Ionicons name="people-circle-outline" size={18} color={colors.tealDark} />
              <Text style={[type.smallMedium, { color: colors.tealDark }]}>My Doctor Connections</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.tealDark} style={{ marginLeft: 'auto' }} />
            </Pressable>
            <Text style={[type.title, { color: colors.ink, marginVertical: spacing.md }]}>{filtered.length} available nearby</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DoctorCard doctor={item} onPress={() => navigation.navigate('DoctorProfile', { doctorId: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  connectionsRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.infoBg, padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm },
});
