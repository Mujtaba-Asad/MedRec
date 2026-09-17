import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { IconCircle, ProgressDots } from '../../components/misc';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EmergencyContact'>;

export default function EmergencyContactScreen({ navigation }: Props) {
  const { updateProfile, completeOnboarding } = useApp();
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');

  const canFinish = name.trim().length > 1 && phone.trim().length >= 9;

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Set Up Profile" />
      <View style={{ marginVertical: spacing.lg }}>
        <ProgressDots total={3} current={2} />
      </View>

      <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
        <IconCircle name="call-outline" size={56} iconSize={26} />
      </View>

      <Text style={[type.h3, { color: colors.ink, marginBottom: spacing.xs, textAlign: 'center' }]}>Emergency contact</Text>
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl, textAlign: 'center' }]}>
        Shown on your lock-screen emergency card so first responders can reach someone fast.
      </Text>

      <Input label="Contact Name" placeholder="e.g. Ayesha Khan" value={name} onChangeText={setName} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Relationship" placeholder="e.g. Spouse, Parent, Sibling" value={relation} onChangeText={setRelation} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Phone Number" placeholder="+92 300 1234567" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Finish Setup"
          disabled={!canFinish}
          trailingIcon={<Ionicons name="checkmark-circle-outline" size={18} color={colors.white} />}
          onPress={() => {
            updateProfile({ emergencyContact: { name, relation, phone } });
            completeOnboarding();
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
          }}
        />
      </View>
    </ScreenContainer>
  );
}
