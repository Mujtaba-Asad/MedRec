import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ShareProfileQR'>;

function QRPlaceholder() {
  // A believable static QR pattern built from a fixed seed so it renders
  // identically every time, without pulling in a QR-generation library.
  const seed = 137;
  const cells = Array.from({ length: 11 * 11 }, (_, i) => ((seed * (i + 7)) % 13) < 6);
  return (
    <View style={styles.qrGrid}>
      {cells.map((on, i) => (
        <View key={i} style={[styles.qrCell, { backgroundColor: on ? colors.ink : 'transparent' }]} />
      ))}
    </View>
  );
}

export default function ShareProfileQRScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Share via QR Code" />

      <Card style={{ alignItems: 'center', paddingVertical: spacing.xxl, marginBottom: spacing.xl }}>
        <QRPlaceholder />
        <Text style={[type.title, { color: colors.ink, marginTop: spacing.xl }]}>Scan to view</Text>
        <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs }]}>medrecapp.com/s/8f2k-91qz</Text>
        <View style={styles.expiryPill}>
          <Ionicons name="time-outline" size={13} color={colors.warning} />
          <Text style={[type.caption, { color: colors.warning }]}>Expires in 23h 58m</Text>
        </View>
      </Card>

      <Button label="Copy Link" variant="secondary" icon={<Ionicons name="copy-outline" size={16} color={colors.ink} />} style={{ marginBottom: spacing.sm }} onPress={() => {}} />
      <Button label="Share via WhatsApp / Message" icon={<Ionicons name="paper-plane-outline" size={16} color={colors.white} />} style={{ marginBottom: spacing.sm }} onPress={() => {}} />
      <Button label="Revoke Access" variant="ghost" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  qrGrid: { width: 176, height: 176, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.white, padding: 8, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  qrCell: { width: `${100 / 11}%`, height: `${100 / 11}%` },
  expiryPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.warningBg, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: radius.pill, marginTop: spacing.md },
});
