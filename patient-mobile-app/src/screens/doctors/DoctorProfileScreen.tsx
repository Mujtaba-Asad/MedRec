import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Badge, Divider } from '../../components/misc';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorProfile'>;

const STATS = (fee: number) => [
  { icon: 'time-outline' as const, label: '15 min', sub: 'Consultation' },
  { icon: 'people-outline' as const, label: '3.2k+', sub: 'Patients' },
  { icon: 'cash-outline' as const, label: `Rs ${fee}`, sub: 'Per Visit' },
];

export default function DoctorProfileScreen({ navigation, route }: Props) {
  const { doctors, toggleDoctorConnection } = useApp();
  const doctor = doctors.find((d) => d.id === route.params.doctorId);
  if (!doctor) return null;

  return (
    <ScreenContainer>
      <Header
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={() => toggleDoctorConnection(doctor.id)} hitSlop={8}>
            <Ionicons name={doctor.connected ? 'person-remove-outline' : 'person-add-outline'} size={20} color={colors.ink} />
          </Pressable>
        }
      />

      <View style={{ alignItems: 'center' }}>
        <View style={[styles.avatar, { backgroundColor: doctor.avatarColor }]}>
          <Text style={styles.avatarText}>{doctor.initials}</Text>
        </View>
        <Text style={[type.h2, { color: colors.ink, marginTop: spacing.md }]}>{doctor.name}</Text>
        <Text style={[type.body, { color: colors.slate, marginTop: 2 }]}>{doctor.specialty}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.xs }}>
          <Ionicons name="location-outline" size={14} color={colors.mist} />
          <Text style={[type.small, { color: colors.mist }]}>{doctor.hospital} · {doctor.distanceKm} km away</Text>
        </View>
        {doctor.connected && <View style={{ marginTop: spacing.sm }}><Badge label="Connected" tone="success" /></View>}
      </View>

      <View style={styles.statsRow}>
        {STATS(doctor.fee).map((s) => (
          <View key={s.sub} style={styles.statBox}>
            <Ionicons name={s.icon} size={18} color={colors.tealDark} />
            <Text style={[type.bodyMedium, { color: colors.ink, marginTop: 6 }]}>{s.label}</Text>
            <Text style={[type.caption, { color: colors.slate }]}>{s.sub}</Text>
          </View>
        ))}
      </View>

      <Card style={{ marginVertical: spacing.lg }}>
        <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>About</Text>
        <Text style={[type.body, { color: colors.ink }]}>
          {doctor.name.replace('Dr. ', '')} specializes in {doctor.specialty.toLowerCase()} with over 12 years of clinical experience,
          seeing patients both in person and over video call. Speaks {doctor.languages.join(', ')}.
        </Text>
      </Card>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg }}>
        <Ionicons name="star" size={16} color={colors.warning} />
        <Text style={[type.bodyMedium, { color: colors.ink }]}>{doctor.rating} rating</Text>
        <Text style={[type.small, { color: colors.slate }]}>from {doctor.reviews} reviews</Text>
      </View>

      <Divider />

      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
        <Button
          label="Message"
          variant="secondary"
          icon={<Ionicons name="chatbubble-outline" size={16} color={colors.ink} />}
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('RequestMedicineChange', { doctorId: doctor.id })}
        />
        <Button
          label="Book Appointment"
          style={{ flex: 1.4 }}
          onPress={() => navigation.navigate('SelectAppointmentTime', { doctorId: doctor.id })}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 30, fontWeight: '700' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl, gap: spacing.sm },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.borderSoft, paddingVertical: spacing.md },
});
