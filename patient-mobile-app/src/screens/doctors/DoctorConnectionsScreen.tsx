import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { IconCircle } from '../../components/misc';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorConnections'>;

export default function DoctorConnectionsScreen({ navigation }: Props) {
  const { doctors } = useApp();
  const connected = doctors.filter((d) => d.connected);

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Doctor Connections" />

      {connected.length === 0 ? (
        <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
          <IconCircle name="people-outline" size={64} iconSize={30} />
          <Text style={[type.body, { color: colors.slate, marginTop: spacing.md, textAlign: 'center' }]}>
            No connections yet. Connect with a doctor after a visit, or add one directly.
          </Text>
        </View>
      ) : (
        connected.map((d) => (
          <Card key={d.id} style={{ marginBottom: spacing.md }}>
            <View style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: d.avatarColor }]}>
                <Text style={styles.avatarText}>{d.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.bodyMedium, { color: colors.ink }]}>{d.name}</Text>
                <Text style={[type.small, { color: colors.slate }]}>{d.specialty} · Last visit {d.nextAvailable.includes('Today') ? 'recent' : 'a while ago'}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
              <Button label="Request Rx Change" size="sm" variant="secondary" style={{ flex: 1 }} onPress={() => navigation.navigate('RequestMedicineChange', { doctorId: d.id })} />
              <Button label="Book Again" size="sm" style={{ flex: 1 }} onPress={() => navigation.navigate('DoctorProfile', { doctorId: d.id })} />
            </View>
          </Card>
        ))
      )}

      <View style={{ marginTop: spacing.lg }}>
        <Button label="Find More Doctors" variant="ghost" icon={<Ionicons name="add" size={16} color={colors.tealDark} />} onPress={() => navigation.navigate('ConnectWithDoctor')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
});
