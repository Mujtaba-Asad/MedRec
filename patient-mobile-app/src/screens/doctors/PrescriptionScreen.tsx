import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Divider } from '../../components/misc';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Prescription'>;

export default function PrescriptionScreen({ navigation }: Props) {
  const { medications, activeProfileId, profile, doctors } = useApp();
  const myMeds = medications.filter((m) => m.profileId === activeProfileId);
  const doctor = doctors.find((d) => d.connected) ?? doctors[0];

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Prescription" />

      <Card style={{ marginBottom: spacing.lg }}>
        <View style={styles.rxHeader}>
          <Image source={require('../../../assets/brand/logo.png')} style={styles.logo} resizeMode="contain" />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[type.caption, { color: colors.mist }]}>Issued</Text>
            <Text style={[type.smallMedium, { color: colors.ink }]}>{new Date().toDateString()}</Text>
          </View>
        </View>
        <Divider />
        <View style={{ marginTop: spacing.md }}>
          <Text style={[type.caption, { color: colors.mist }]}>Patient</Text>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>{profile.fullName || 'Patient'}</Text>
        </View>
        <View style={{ marginTop: spacing.md }}>
          <Text style={[type.caption, { color: colors.mist }]}>Prescribed by</Text>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>{doctor?.name} · {doctor?.specialty}</Text>
        </View>
      </Card>

      <Text style={[type.title, { color: colors.ink, marginBottom: spacing.md }]}>Rx</Text>
      {myMeds.map((m, i) => (
        <Card key={m.id} style={{ marginBottom: spacing.md }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]}>{i + 1}. {m.name} — {m.dosage}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>{m.frequency}{m.instructions ? ` · ${m.instructions}` : ''}</Text>
        </Card>
      ))}

      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
        <Button label="Share with Pharmacy" icon={<Ionicons name="storefront-outline" size={16} color={colors.white} />} style={{ flex: 1 }} onPress={() => {}} />
      </View>
      <View style={{ marginTop: spacing.sm }}>
        <Button label="Download PDF" variant="outline" icon={<Ionicons name="download-outline" size={16} color={colors.ink} />} onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  rxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logo: { width: 70, height: 52 },
});
