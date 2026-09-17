import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { updateProfile } = useApp();
  const [stage, setStage] = useState<'form' | 'otp'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const canSend = name.trim().length > 1 && phone.trim().length >= 9;
  const canVerify = otp.every((d) => d.length === 1);

  return (
    <ScreenContainer>
      <View style={styles.brandRow}>
        <Image source={require('../../../assets/brand/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      {stage === 'form' ? (
        <>
          <Text style={[type.h2, { color: colors.ink }]}>Log In / Sign Up</Text>
          <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl, marginTop: spacing.xs }]}>
            We'll text you a one-time code — no password to remember.
          </Text>

          <Input label="Full Name" placeholder="e.g. Ahmed Khan" value={name} onChangeText={setName} autoCapitalize="words" containerStyle={{ marginBottom: spacing.lg }} />

          <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Phone Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text style={{ fontSize: 16 }}>🇵🇰</Text>
              <Text style={[type.bodyMedium, { color: colors.ink }]}>+92</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input placeholder="300 1234567" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            </View>
          </View>

          <View style={{ marginTop: spacing.xxl }}>
            <Button label="Send OTP" disabled={!canSend} onPress={() => setStage('otp')} />
          </View>
        </>
      ) : (
        <>
          <Text style={[type.h2, { color: colors.ink }]}>Verify your number</Text>
          <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl, marginTop: spacing.xs }]}>
            Enter the 4-digit code sent to +92 {phone}
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { otpRefs.current[i] = r; }}
                value={digit}
                onChangeText={(t) => {
                  const clean = t.replace(/[^0-9]/g, '').slice(-1);
                  const next = [...otp];
                  next[i] = clean;
                  setOtp(next);
                  if (clean && i < 3) otpRefs.current[i + 1]?.focus();
                }}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpBox}
              />
            ))}
          </View>

          <Text style={[type.small, { color: colors.tealDark, marginTop: spacing.lg }]}>Resend code in 00:28</Text>

          <View style={{ marginTop: spacing.xxl }}>
            <Button
              label="Verify & Continue"
              disabled={!canVerify}
              onPress={() => {
                updateProfile({ fullName: name, phone: `+92 ${phone}` });
                navigation.navigate('ProfileBasics');
              }}
            />
          </View>
        </>
      )}

      <View style={styles.divider}>
        <Ionicons name="shield-checkmark-outline" size={14} color={colors.mist} />
        <Text style={[type.caption, { color: colors.mist }]}>Your number is only used to secure your account</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  brandRow: { alignItems: 'center', marginBottom: spacing.xl },
  logo: { width: 100, height: 76 },
  phoneRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  countryCode: {
    flexDirection: 'row', alignItems: 'center', gap: 6, height: 52, paddingHorizontal: spacing.md,
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.card,
  },
  otpRow: { flexDirection: 'row', gap: spacing.md, justifyContent: 'center' },
  otpBox: {
    width: 56, height: 60, borderRadius: 14, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.card, textAlign: 'center', fontSize: 22, color: colors.ink,
  },
  divider: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xxl },
});
