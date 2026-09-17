import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Input from '../../components/Input';
import DatePickerInput from '../../components/DatePickerInput';
import Button from '../../components/Button';
import { Toast } from '../../components/Dialog';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalProfileEdit'>;

export default function PersonalProfileEditScreen({ navigation }: Props) {
  const { profile, updateProfile } = useApp();
  const [fullName, setFullName] = useState(profile.fullName);
  const [dob, setDob] = useState(profile.dob);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);
  const [saved, setSaved] = useState(false);

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Personal Information" />

      <Input label="Full Name" value={fullName} onChangeText={setFullName} containerStyle={{ marginBottom: spacing.lg }} />
      <DatePickerInput label="Date of Birth" value={dob} onChangeText={setDob} containerStyle={{ marginBottom: spacing.lg }} />
      <Input label="Phone Number" value={profile.phone} editable={false} containerStyle={{ marginBottom: spacing.lg }} hint="Contact support to change your number" />
      <View style={{ flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl }}>
        <Input label="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" containerStyle={{ flex: 1 }} />
        <Input label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" containerStyle={{ flex: 1 }} />
      </View>

      <Button
        label="Save Changes"
        icon={<Ionicons name="checkmark" size={18} color={colors.white} />}
        onPress={() => { updateProfile({ fullName, dob, height, weight }); setSaved(true); }}
      />
      <Toast visible={saved} message="Profile updated" onHide={() => setSaved(false)} />
    </ScreenContainer>
  );
}
