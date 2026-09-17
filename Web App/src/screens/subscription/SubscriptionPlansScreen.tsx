import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { Badge } from '../../components/misc';
import { colors, radius, shadow, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'SubscriptionPlans'>;

const PLANS = [
  {
    id: 'Free' as const, name: 'Free', price: 'Rs 0', period: '',
    features: ['Unlimited records on this device', '1 profile', 'Manual entry & scanning'],
  },
  {
    id: 'Family' as const, name: 'Family', price: 'Rs 499', period: '/month',
    features: ['Everything in Free', 'Up to 6 family profiles', 'Encrypted cloud backup', 'Priority doctor booking'],
    highlight: true,
  },
  {
    id: 'Premium' as const, name: 'Premium', price: 'Rs 999', period: '/month',
    features: ['Everything in Family', 'Unlimited AI Assistant queries', 'Free platform fee on bookings', '24/7 priority support'],
  },
];

export default function SubscriptionPlansScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<'Family' | 'Premium'>('Family');

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Subscription Plans" />
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        Your records always stay on your device — plans add family profiles, backup, and doctor perks.
      </Text>

      {PLANS.map((plan) => {
        const isPaid = plan.id !== 'Free';
        const active = isPaid && selected === plan.id;
        const Wrapper: any = isPaid ? Pressable : View;
        return (
          <Wrapper key={plan.id} onPress={isPaid ? () => setSelected(plan.id as 'Family' | 'Premium') : undefined} style={[styles.card, active && styles.cardActive]}>
            {plan.highlight && <View style={styles.badgeWrap}><Badge label="MOST POPULAR" tone="success" /></View>}
            <View style={styles.rowBetween}>
              <Text style={[type.h3, { color: colors.ink }]}>{plan.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={[type.h3, { color: colors.ink }]}>{plan.price}</Text>
                <Text style={[type.small, { color: colors.slate }]}>{plan.period}</Text>
              </View>
            </View>
            <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
              {plan.features.map((f) => (
                <View key={f} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[type.small, { color: colors.ink2, flex: 1 }]}>{f}</Text>
                </View>
              ))}
            </View>
            {isPaid && (
              <View style={styles.radioWrap}>
                <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={20} color={active ? colors.tealDark : colors.mist} />
              </View>
            )}
          </Wrapper>
        );
      })}

      <View style={{ marginTop: spacing.lg }}>
        <Button label={`Continue with ${selected}`} onPress={() => navigation.navigate('ConfirmSubscription', { plan: selected })} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.borderSoft,
    padding: spacing.lg, marginBottom: spacing.lg, position: 'relative',
  },
  cardActive: { borderColor: colors.tealDark, ...shadow.card },
  badgeWrap: { position: 'absolute', top: -10, left: spacing.lg },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.xs },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  radioWrap: { position: 'absolute', top: spacing.lg, right: spacing.lg },
});
