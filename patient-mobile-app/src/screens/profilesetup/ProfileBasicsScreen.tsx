import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DatePickerInput from '../../components/DatePickerInput';
import { ProgressDots } from '../../components/misc';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileBasics'>;

const GENDERS = ['Female', 'Male', 'Other'];

export default function ProfileBasicsScreen({ navigation }: Props) {
  const { profile, updateProfile } = useApp();
  const [dob, setDob] = useState(profile.dob);
  const [gender, setGender] = useState(profile.gender);
  const [height, setHeight] = useState(profile.height);
  const [weight, setWeight] = useState(profile.weight);

  const canContinue = dob.length > 0 && gender.length > 0;

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Set Up Profile" />
      <View style={{ marginVertical: spacing.lg }}>
        <ProgressDots total={3} current={0} />
      </View>
      <Text style={[type.h3, { color: colors.ink, marginBottom: spacing.xs }]}>The basics</Text>
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        This helps doctors and your family know who a record belongs to.
      </Text>

      <DatePickerInput
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        containerStyle={{ marginBottom: spacing.lg }}
      />

      <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Gender</Text>
      <View style={styles.chipRow}>
        {GENDERS.map((g) => (
          <Pressable key={g} onPress={() => setGender(g)} style={[styles.chip, gender === g && styles.chipActive]}>
            <Text style={[type.smallMedium, { color: gender === g ? colors.white : colors.ink2 }]}>{g}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.row}>
        <Input label="Height (cm)" placeholder="170" keyboardType="numeric" value={height} onChangeText={setHeight} containerStyle={{ flex: 1 }} />
        <Input label="Weight (kg)" placeholder="65" keyboardType="numeric" value={weight} onChangeText={setWeight} containerStyle={{ flex: 1 }} />
      </View>

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Continue"
          disabled={!canContinue}
          onPress={() => {
            updateProfile({ dob, gender, height, weight });
            navigation.navigate('HealthBasics');
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chipRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  chip: {
    paddingHorizontal: spacing.lg, height: 42, borderRadius: 21, justifyContent: 'center',
    backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  row: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
});
