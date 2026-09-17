import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import { Badge, Divider, ListRow } from '../../components/misc';
import { ConfirmDialog } from '../../components/Dialog';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProfileScreen({ navigation }: Props) {
  const { profile, resetApp } = useApp();
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{(profile.fullName || 'Y')[0]}</Text></View>
          <Text style={[type.h3, { color: colors.ink, marginTop: spacing.md }]}>{profile.fullName || 'Your Profile'}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>{profile.phone || 'No phone on file'}</Text>
          <View style={{ marginTop: spacing.sm }}><Badge label={`${profile.plan} Plan`} tone={profile.plan === 'Free' ? 'neutral' : 'success'} /></View>
        </View>

        <Card style={{ marginBottom: spacing.lg }}>
          <ListRow icon={<Ionicons name="person-outline" size={20} color={colors.tealDark} />} title="Personal Information" subtitle="Name, DOB, health basics" onPress={() => navigation.navigate('PersonalProfileEdit')} />
          <Divider />
          <ListRow icon={<Ionicons name="medical-outline" size={20} color={colors.tealDark} />} title="Emergency Profile" subtitle="Blood type, allergies, contact" onPress={() => navigation.navigate('EmergencyProfile')} />
          <Divider />
          <ListRow icon={<Ionicons name="people-outline" size={20} color={colors.tealDark} />} title="Family Profiles" subtitle="Manage linked family members" onPress={() => navigation.navigate('FamilyProfiles')} />
          <Divider />
          <ListRow icon={<Ionicons name="share-social-outline" size={20} color={colors.tealDark} />} title="Share Profile" subtitle="QR code or secure link" onPress={() => navigation.navigate('ShareProfileChoose')} />
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <ListRow icon={<Ionicons name="medkit-outline" size={20} color={colors.tealDark} />} title="Doctor Connections" onPress={() => navigation.navigate('DoctorConnections')} />
          <Divider />
          <ListRow icon={<Ionicons name="document-text-outline" size={20} color={colors.tealDark} />} title="Prescriptions" onPress={() => navigation.navigate('Prescription', {})} />
          <Divider />
          <ListRow icon={<Ionicons name="diamond-outline" size={20} color={colors.tealDark} />} title="Subscription" subtitle={`${profile.plan} plan`} onPress={() => navigation.navigate('SubscriptionPlans')} />
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <ListRow icon={<Ionicons name="notifications-outline" size={20} color={colors.tealDark} />} title="Notifications" onPress={() => {}} />
          <Divider />
          <ListRow icon={<Ionicons name="shield-checkmark-outline" size={20} color={colors.tealDark} />} title="Privacy & Data" subtitle="Your data stays on this device" onPress={() => {}} />
          <Divider />
          <ListRow icon={<Ionicons name="help-circle-outline" size={20} color={colors.tealDark} />} title="Help & Support" onPress={() => {}} />
        </Card>

        <Card onPress={() => setConfirmSignOut(true)}>
          <ListRow icon={<Ionicons name="log-out-outline" size={20} color={colors.danger} />} title="Sign Out" danger />
        </Card>

        <ConfirmDialog
          visible={confirmSignOut}
          tone="danger"
          icon="log-out-outline"
          title="Sign out of MedRec?"
          message="Your records stay safely on this device. You can sign back in with your phone number anytime."
          confirmLabel="Sign Out"
          onConfirm={() => { resetApp(); setConfirmSignOut(false); navigation.getParent()?.reset?.({ index: 0, routes: [{ name: 'Onboarding' }] } as any); }}
          onCancel={() => setConfirmSignOut(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, paddingBottom: 120 },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 30, fontWeight: '700' },
});
