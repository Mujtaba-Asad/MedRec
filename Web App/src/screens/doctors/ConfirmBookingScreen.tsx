import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Divider } from '../../components/misc';
import { ConfirmDialog } from '../../components/Dialog';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmBooking'>;

const PAYMENT_METHODS = [
  { id: 'card', label: 'Debit / Credit Card', icon: 'card-outline' as const },
  { id: 'easypaisa', label: 'Easypaisa', icon: 'phone-portrait-outline' as const },
  { id: 'cash', label: 'Pay at Clinic', icon: 'cash-outline' as const },
];

export default function ConfirmBookingScreen({ navigation, route }: Props) {
  const { doctors, bookAppointment } = useApp();
  const { doctorId, date, time } = route.params;
  const doctor = doctors.find((d) => d.id === doctorId);
  const [method, setMethod] = useState('card');
  const [success, setSuccess] = useState(false);
  if (!doctor) return null;

  const fee = doctor.fee;
  const platformFee = 100;

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Confirm & Pay" />

      <Card style={{ marginBottom: spacing.lg, flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
        <View style={[styles.avatar, { backgroundColor: doctor.avatarColor }]}>
          <Text style={styles.avatarText}>{doctor.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>{doctor.name}</Text>
          <Text style={[type.small, { color: colors.slate }]}>{doctor.specialty}</Text>
        </View>
      </Card>

      <Card style={{ marginBottom: spacing.lg }}>
        <View style={styles.detailRow}><Ionicons name="calendar-outline" size={16} color={colors.tealDark} /><Text style={[type.small, { color: colors.ink }]}>{date}</Text></View>
        <View style={styles.detailRow}><Ionicons name="time-outline" size={16} color={colors.tealDark} /><Text style={[type.small, { color: colors.ink }]}>{time}</Text></View>
      </Card>

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Payment Method</Text>
      <View style={{ gap: spacing.sm, marginBottom: spacing.xl }}>
        {PAYMENT_METHODS.map((m) => (
          <Pressable key={m.id} onPress={() => setMethod(m.id)} style={[styles.methodRow, method === m.id && styles.methodRowActive]}>
            <Ionicons name={m.icon} size={18} color={colors.ink2} />
            <Text style={[type.body, { color: colors.ink, flex: 1 }]}>{m.label}</Text>
            <Ionicons name={method === m.id ? 'radio-button-on' : 'radio-button-off'} size={18} color={method === m.id ? colors.tealDark : colors.mist} />
          </Pressable>
        ))}
      </View>

      <Divider />

      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <View style={styles.rowBetween}><Text style={[type.small, { color: colors.slate }]}>Consultation Fee</Text><Text style={[type.small, { color: colors.ink }]}>Rs {fee}</Text></View>
        <View style={styles.rowBetween}><Text style={[type.small, { color: colors.slate }]}>Platform Fee</Text><Text style={[type.small, { color: colors.ink }]}>Rs {platformFee}</Text></View>
        <View style={styles.rowBetween}><Text style={[type.title, { color: colors.ink }]}>Total</Text><Text style={[type.title, { color: colors.ink }]}>Rs {fee + platformFee}</Text></View>
      </View>

      <View style={{ marginTop: spacing.xxl }}>
        <Button label={`Pay Rs ${fee + platformFee} & Confirm`} onPress={() => setSuccess(true)} />
      </View>

      <ConfirmDialog
        visible={success}
        tone="success"
        icon="checkmark-circle"
        title="Appointment Confirmed!"
        message={`Your ${time.includes('Video') ? 'video call' : 'visit'} with ${doctor.name} is booked for ${date}.`}
        confirmLabel="Go to Consultation"
        cancelLabel="Back to Home"
        onConfirm={() => {
          const id = `a${Date.now()}`;
          bookAppointment({ id, doctorId, date, time, mode: time.includes('Video') ? 'Video Call' : 'In Person', status: 'Upcoming', fee: fee + platformFee });
          navigation.replace('ConsultationCall', { doctorId });
        }}
        onCancel={() => {
          const id = `a${Date.now()}`;
          bookAppointment({ id, doctorId, date, time, mode: time.includes('Video') ? 'Video Call' : 'In Person', status: 'Upcoming', fee: fee + platformFee });
          navigation.navigate('MainTabs', { screen: 'Home' });
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xs },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card },
  methodRowActive: { borderColor: colors.tealDark, backgroundColor: colors.infoBg },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
});
