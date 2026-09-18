import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewRecord'>;

export default function ViewRecordScreen({ navigation, route }: Props) {
  const { records } = useApp();
  const record = records.find((r) => r.id === route.params.recordId);

  return (
    <ScreenContainer background={colors.ink}>
      <Header
        onBack={() => navigation.goBack()}
        title="Original Document"
        transparent
      />

      {/* Photo frame — show real image if available */}
      <View style={styles.photoFrame}>
        {record?.photoUri ? (
          <Image
            source={{ uri: record.photoUri }}
            style={styles.photoImage}
            resizeMode="contain"
          />
        ) : (
          <>
            <Ionicons name="document-text-outline" size={72} color="rgba(255,255,255,0.5)" />
            <Text style={styles.photoLabel}>Scanned photo preview</Text>
          </>
        )}
      </View>

      <Card style={styles.textCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md }}>
          <Ionicons name="text-outline" size={16} color={colors.tealDark} />
          <Text style={[type.smallMedium, { color: colors.ink2 }]}>Extracted Text</Text>
        </View>
        <Text style={[type.body, { color: colors.ink }]}>
          {record?.title}{'\n'}{record?.provider} — {record?.date}{'\n\n'}{record?.summary}
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  photoFrame: {
    height: 380,
    borderRadius: radius.lg,
    backgroundColor: '#1B2127',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoLabel: { color: 'rgba(255,255,255,0.5)', marginTop: spacing.md, ...type.small },
  textCard: { marginBottom: spacing.xl },
});
