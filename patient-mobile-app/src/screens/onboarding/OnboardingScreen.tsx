import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Button from '../../components/Button';
import { CheckRow } from '../../components/misc';
import { colors, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const FEATURES = [
  { icon: 'scan-outline' as const, label: 'Scan & auto-file reports' },
  { icon: 'people-outline' as const, label: 'One place for the whole family' },
  { icon: 'lock-closed-outline' as const, label: 'Stored on your device, not the cloud' },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [storageConsent, setStorageConsent] = useState(true);
  const [termsConsent, setTermsConsent] = useState(false);

  return (
    <ScreenContainer scroll={false} padded={false} background={colors.paper}>
      <LinearGradient colors={['#EAF6F5', colors.paper]} style={styles.hero}>
        <View style={styles.logoRow}>
          <Image source={require('../../../assets/brand/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={[type.h1, styles.headline]}>Your medical history, finally in one place.</Text>
        <Text style={[type.body, styles.sub]}>
          Scan reports, save prescriptions, and find anything in seconds — for you and your family.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={16} color={colors.tealDark} />
              </View>
              <Text style={[type.small, { color: colors.ink2 }]}>{f.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.consents}>
          <CheckRow checked={storageConsent} onToggle={() => setStorageConsent((v) => !v)}>
            Keep my medical records stored locally on this device, with optional encrypted backup for paid plans.
          </CheckRow>
          <CheckRow checked={termsConsent} onToggle={() => setTermsConsent((v) => !v)}>
            I agree to the Terms of Service and Privacy Policy.
          </CheckRow>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="Get Started"
          disabled={!storageConsent || !termsConsent}
          onPress={() => navigation.navigate('Login')}
          trailingIcon={<Ionicons name="arrow-forward" size={18} color={colors.white} />}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { height: 220, alignItems: 'center', justifyContent: 'center' },
  logoRow: { alignItems: 'center' },
  logo: { width: 160, height: 120 },
  body: { paddingHorizontal: spacing.xl, flex: 1 },
  headline: { color: colors.ink, marginBottom: spacing.sm },
  sub: { color: colors.slate, marginBottom: spacing.xl },
  features: { gap: spacing.md, marginBottom: spacing.xl },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  featureIcon: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.infoBg,
    alignItems: 'center', justifyContent: 'center',
  },
  consents: { gap: spacing.lg, marginTop: spacing.sm },
  footer: { padding: spacing.xl },
});
