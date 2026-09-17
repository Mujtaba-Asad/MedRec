import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Divider } from '../../components/misc';
import { ConfirmDialog } from '../../components/Dialog';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmSubscription'>;

const PRICES: Record<string, number> = { Family: 499, Premium: 999 };

export default function ConfirmSubscriptionScreen({ navigation, route }: Props) {
  const { plan } = route.params;
  const { updateProfile } = useApp();
  const [success, setSuccess] = useState(false);
  const price = PRICES[plan];

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Confirm Subscription" />

      <Card style={{ marginBottom: spacing.lg }}>
        <View style={styles.rowBetween}>
          <Text style={[type.title, { color: colors.ink }]}>{plan} Plan</Text>
          <Text style={[type.title, { color: colors.ink }]}>Rs {price}/mo</Text>
        </View>
        <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs }]}>Billed monthly · Cancel anytime</Text>
      </Card>

      <Card style={{ marginBottom: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <Ionicons name="card-outline" size={20} color={colors.ink2} />
        <Text style={[type.body, { color: colors.ink, flex: 1 }]}>Debit / Credit Card</Text>
        <Ionicons name="chevron-forward" size={18} color={colors.mist} />
      </Card>

      <Divider />

      <View style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}>
        <View style={styles.rowBetween}><Text style={[type.small, { color: colors.slate }]}>Today's charge</Text><Text style={[type.small, { color: colors.ink }]}>Rs {price}</Text></View>
        <View style={styles.rowBetween}><Text style={[type.small, { color: colors.slate }]}>Renews</Text><Text style={[type.small, { color: colors.ink }]}>Monthly</Text></View>
      </View>

      <Button label={`Subscribe for Rs ${price}/mo`} onPress={() => setSuccess(true)} />

      <ConfirmDialog
        visible={success}
        tone="success"
        title={`Welcome to ${plan}!`}
        message="Your subscription is active. Family profiles and cloud backup are now unlocked."
        confirmLabel="Done"
        onConfirm={() => {
          updateProfile({ plan });
          navigation.navigate('MainTabs', { screen: 'Profile' });
        }}
        onCancel={() => setSuccess(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
});
