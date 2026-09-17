import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Badge } from '../../components/misc';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EmergencyProfile'>;

export default function EmergencyProfileScreen({ navigation }: Props) {
  const { profile, updateProfile } = useApp();
  const [contactName, setContactName] = useState(profile.emergencyContact.name);
  const [contactPhone, setContactPhone] = useState(profile.emergencyContact.phone);

  return (
    <ScreenContainer background={colors.ink}>
      <Header onBack={() => navigation.goBack()} title="Emergency Profile" transparent />

      <Card style={styles.emergencyCard} elevated={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md }}>
          <Ionicons name="warning" size={18} color={colors.danger} />
          <Text style={[type.smallMedium, { color: colors.danger }]}>SHOWN ON LOCK SCREEN</Text>
        </View>
        <Text style={[type.h2, { color: colors.ink }]}>{profile.fullName || 'Your name'}</Text>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          <Badge label={`Blood ${profile.bloodType || '—'}`} tone="danger" />
          {profile.allergies.map((a) => <Badge key={a} label={a} tone="warning" />)}
        </View>
        {profile.conditions.length > 0 && (
          <Text style={[type.small, { color: colors.slate, marginTop: spacing.md }]}>
            Conditions: {profile.conditions.join(', ')}
          </Text>
        )}
        <View style={styles.contactRow}>
          <Ionicons name="call" size={16} color={colors.tealDark} />
          <Text style={[type.smallMedium, { color: colors.ink }]}>{profile.emergencyContact.name || 'No contact set'} · {profile.emergencyContact.phone}</Text>
        </View>
      </Card>

      <Text style={[type.title, { color: colors.white, marginBottom: spacing.md }]}>Update emergency contact</Text>
      <Input label="Contact Name" value={contactName} onChangeText={setContactName} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Phone Number" value={contactPhone} onChangeText={setContactPhone} keyboardType="phone-pad" containerStyle={{ marginBottom: spacing.xl }} />

      <Button
        label="Save Emergency Info"
        onPress={() => {
          updateProfile({ emergencyContact: { ...profile.emergencyContact, name: contactName, phone: contactPhone } });
          navigation.goBack();
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  emergencyCard: { backgroundColor: colors.white, marginBottom: spacing.xl },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderSoft },
});
