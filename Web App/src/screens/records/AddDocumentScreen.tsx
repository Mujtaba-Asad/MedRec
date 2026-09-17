import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { colors, radius, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDocument'>;

export default function AddDocumentScreen({ navigation }: Props) {
  return (
    <ScreenContainer scroll={false}>
      <Header onBack={() => navigation.goBack()} title="Add Document" />

      <View style={styles.viewfinder}>
        <Ionicons name="scan-outline" size={56} color="rgba(255,255,255,0.85)" />
        <Text style={styles.viewfinderText}>Line up the report inside the frame</Text>
        <View style={styles.corner1} />
        <View style={styles.corner2} />
        <View style={styles.corner3} />
        <View style={styles.corner4} />
      </View>

      <Pressable style={styles.shutterWrap} onPress={() => navigation.navigate('ConfirmDetails', { imageCaptured: true })}>
        <LinearGradient colors={colors.gradient} style={styles.shutter}>
          <Ionicons name="camera" size={26} color={colors.white} />
        </LinearGradient>
      </Pressable>
      <Text style={[type.small, { color: colors.slate, textAlign: 'center', marginTop: spacing.sm }]}>Tap to scan</Text>

      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
        <Card style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('ConfirmDetails', { imageCaptured: true })}>
          <Ionicons name="images-outline" size={22} color={colors.tealDark} />
          <Text style={[type.smallMedium, { color: colors.ink, marginTop: spacing.sm }]}>Upload from Gallery</Text>
        </Card>
        <Card style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('TypeManually')}>
          <Ionicons name="create-outline" size={22} color={colors.tealDark} />
          <Text style={[type.smallMedium, { color: colors.ink, marginTop: spacing.sm }]}>Type Manually</Text>
        </Card>
      </View>
    </ScreenContainer>
  );
}

const CORNER = 26;
const styles = StyleSheet.create({
  viewfinder: {
    height: 340, borderRadius: radius.lg, backgroundColor: colors.ink,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.md, overflow: 'hidden',
  },
  viewfinderText: { color: 'rgba(255,255,255,0.7)', marginTop: spacing.md, ...type.small },
  corner1: { position: 'absolute', top: 24, left: 24, width: CORNER, height: CORNER, borderTopWidth: 3, borderLeftWidth: 3, borderColor: colors.teal, borderTopLeftRadius: 8 },
  corner2: { position: 'absolute', top: 24, right: 24, width: CORNER, height: CORNER, borderTopWidth: 3, borderRightWidth: 3, borderColor: colors.teal, borderTopRightRadius: 8 },
  corner3: { position: 'absolute', bottom: 24, left: 24, width: CORNER, height: CORNER, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: colors.teal, borderBottomLeftRadius: 8 },
  corner4: { position: 'absolute', bottom: 24, right: 24, width: CORNER, height: CORNER, borderBottomWidth: 3, borderRightWidth: 3, borderColor: colors.teal, borderBottomRightRadius: 8 },
  shutterWrap: { alignItems: 'center', marginTop: spacing.xl },
  shutter: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
});
