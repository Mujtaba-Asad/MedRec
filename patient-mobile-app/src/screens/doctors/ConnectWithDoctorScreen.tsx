import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConnectWithDoctor'>;

export default function ConnectWithDoctorScreen({ navigation }: Props) {
  const { doctors, toggleDoctorConnection } = useApp();
  const [code, setCode] = useState('');
  const notConnected = doctors.filter((d) => !d.connected);

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Connect with a Doctor" />
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        Connect so your doctor can securely view records you choose to share, and send you follow-ups.
      </Text>

      <Card style={{ marginBottom: spacing.xl }}>
        <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.sm }]}>Have a doctor's invite code?</Text>
        <Input placeholder="e.g. DR-4F82K" value={code} onChangeText={setCode} autoCapitalize="characters" containerStyle={{ marginBottom: spacing.md }} />
        <Button label="Connect with Code" variant="secondary" disabled={code.trim().length < 4} onPress={() => setCode('')} />
      </Card>

      <Text style={[type.title, { color: colors.ink, marginBottom: spacing.md }]}>Suggested Doctors</Text>
      {notConnected.map((d) => (
        <Card key={d.id} style={{ marginBottom: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View style={[styles.avatar, { backgroundColor: d.avatarColor }]}>
            <Text style={styles.avatarText}>{d.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[type.bodyMedium, { color: colors.ink }]}>{d.name}</Text>
            <Text style={[type.small, { color: colors.slate }]}>{d.specialty}</Text>
          </View>
          <Button label="Connect" size="sm" fullWidth={false} onPress={() => toggleDoctorConnection(d.id)} />
        </Card>
      ))}
      {notConnected.length === 0 && (
        <View style={{ alignItems: 'center', paddingVertical: spacing.xl }}>
          <Ionicons name="checkmark-done-circle-outline" size={40} color={colors.success} />
          <Text style={[type.body, { color: colors.slate, marginTop: spacing.sm }]}>You're connected with every doctor you've seen</Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
});
