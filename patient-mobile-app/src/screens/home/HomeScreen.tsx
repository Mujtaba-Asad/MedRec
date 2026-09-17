import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { Badge, IconCircle } from '../../components/misc';
import { colors, fontFamily, radius, shadow, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { recordCategories } from '../../data/mockData';
import { MedicalRecord } from '../../data/types';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const categoryIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Lab Result': 'flask-outline',
  Prescription: 'medkit-outline',
  Imaging: 'body-outline',
  Vaccination: 'shield-checkmark-outline',
  'Visit Summary': 'document-text-outline',
  Insurance: 'card-outline',
  Other: 'folder-outline',
};

function RecordRow({ record, onPress }: { record: MedicalRecord; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={{ marginBottom: spacing.md }}>
      <View style={styles.recordRow}>
        <IconCircle name={categoryIcon[record.category] ?? 'document-outline'} />
        <View style={{ flex: 1 }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]} numberOfLines={1}>{record.title}</Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]} numberOfLines={1}>{record.provider}</Text>
          <View style={styles.metaRow}>
            <Badge label={record.category} tone="info" />
            <Text style={[type.caption, { color: colors.mist }]}>{record.date}</Text>
          </View>
        </View>
        {record.starred ? <Ionicons name="star" size={16} color={colors.warning} /> : null}
      </View>
    </Card>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const { profile, familyProfiles, activeProfileId, setActiveProfileId, records } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const activePerson = familyProfiles.find((f) => f.id === activeProfileId) ?? familyProfiles[0];

  const filtered = useMemo(() => {
    return records
      .filter((r) => r.profileId === activeProfileId)
      .filter((r) => (category ? r.category === category : true))
      .filter((r) => (query ? r.title.toLowerCase().includes(query.toLowerCase()) : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [records, activeProfileId, category, query]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <Header
        right={
          <Pressable onPress={() => {}} style={styles.bell} hitSlop={8}>
            <Ionicons name="notifications-outline" size={20} color={colors.ink} />
            <View style={styles.dot} />
          </Pressable>
        }
      />
      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.greetRow}>
              <View>
                <Text style={[type.small, { color: colors.slate }]}>Good to see you,</Text>
                <Text style={[type.h2, { color: colors.ink }]}>{profile.fullName || 'there'}</Text>
              </View>
              <Pressable onPress={() => navigation.navigate('FamilyProfiles')} style={styles.avatarBtn}>
                <View style={[styles.avatar, { backgroundColor: activePerson.avatarColor }]}>
                  <Text style={styles.avatarText}>{activePerson.initials}</Text>
                </View>
                <Ionicons name="chevron-down" size={14} color={colors.slate} />
              </Pressable>
            </View>

            <Input
              placeholder="Search records, medicines, doctors…"
              value={query}
              onChangeText={setQuery}
              leftIcon={<Ionicons name="search" size={18} color={colors.mist} />}
              containerStyle={{ marginBottom: spacing.lg }}
            />

            <LinearGradient colors={colors.gradient} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.aiCard}>
              <Pressable onPress={() => navigation.navigate('AIAssistant')} style={styles.aiCardInner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.aiTitle}>Ask the Record Assistant</Text>
                  <Text style={styles.aiSub}>"When was my last CBC test?"</Text>
                </View>
                <Ionicons name="sparkles" size={26} color={colors.white} />
              </Pressable>
            </LinearGradient>

            <View style={styles.chipsRow}>
              {[{id: null, label: 'All'}, ...recordCategories.map((c) => ({ id: c, label: c }))].map((c) => (
                <Pressable
                  key={c.label}
                  onPress={() => setCategory(c.id)}
                  style={[styles.filterChip, category === c.id && styles.filterChipActive]}
                >
                  <Text style={[type.smallMedium, { color: category === c.id ? colors.white : colors.ink2 }]}>{c.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[type.title, { color: colors.ink, marginVertical: spacing.md }]}>Timeline</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecordRow record={item} onPress={() => navigation.navigate('RecordDetail', { recordId: item.id })} />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: spacing.xxxl }}>
            <IconCircle name="document-outline" size={56} iconSize={26} />
            <Text style={[type.body, { color: colors.slate, marginTop: spacing.md }]}>No records yet for {activePerson.name}</Text>
          </View>
        }
      />

      <Pressable style={styles.fab} onPress={() => navigation.navigate('AddDocument')}>
        <LinearGradient colors={colors.gradient} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.fabInner}>
          <Ionicons name="add" size={28} color={colors.white} />
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  avatarBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
  bell: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.paperDim, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.danger },
  aiCard: { borderRadius: radius.lg, marginBottom: spacing.lg, ...shadow.card },
  aiCardInner: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  aiTitle: { color: colors.white, fontSize: 16, fontFamily: fontFamily.bodySemibold },
  aiSub: { color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  filterChip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  recordRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 6 },
  fab: { position: 'absolute', right: spacing.xl, bottom: 24 },
  fabInner: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', ...shadow.float },
});
