import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
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
    <Card onPress={onPress} style={styles.recordCard}>
      <View style={styles.recordRow}>
        <IconCircle name={categoryIcon[record.category] ?? 'document-outline'} />
        <View style={{ flex: 1 }}>
          <Text style={[type.bodyMedium, { color: colors.ink }]} numberOfLines={1}>
            {record.title}
          </Text>
          <Text style={[type.small, { color: colors.slate, marginTop: 2 }]} numberOfLines={1}>
            {record.provider}
          </Text>
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
  const { profile, familyProfiles, activeProfileId, records } = useApp();
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

  const allCategories = useMemo(
    () => [{ id: null, label: 'All' }, ...recordCategories.map((c) => ({ id: c, label: c }))],
    []
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Top Greeting & Header Actions Bar */}
            <View style={styles.topBar}>
              <View style={styles.greetingWrap}>
                <Text style={styles.greetingSub}>Good to see you,</Text>
                <Text style={styles.greetingTitle} numberOfLines={1}>
                  {activePerson?.name || profile.fullName || 'there'}
                </Text>
              </View>

              <View style={styles.actionsWrap}>
                {/* Profile Switcher */}
                <Pressable
                  onPress={() => navigation.navigate('FamilyProfiles')}
                  style={styles.avatarBtn}
                  hitSlop={6}
                >
                  <View style={[styles.avatar, { backgroundColor: activePerson.avatarColor }]}>
                    <Text style={styles.avatarText}>{activePerson.initials}</Text>
                  </View>
                  <Ionicons name="chevron-down" size={14} color={colors.slate} />
                </Pressable>

                {/* Notifications Bell */}
                <Pressable onPress={() => {}} style={styles.bellBtn} hitSlop={8}>
                  <Ionicons name="notifications-outline" size={20} color={colors.ink} />
                  <View style={styles.bellDot} />
                </Pressable>
              </View>
            </View>

            {/* Search Input */}
            <Input
              placeholder="Search records, medicines, doctors…"
              value={query}
              onChangeText={setQuery}
              leftIcon={<Ionicons name="search" size={18} color={colors.mist} />}
              containerStyle={styles.searchInput}
            />

            {/* AI Assistant Banner Card */}
            <LinearGradient
              colors={colors.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.aiCard}
            >
              <Pressable onPress={() => navigation.navigate('AIAssistant')} style={styles.aiCardInner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.aiTitle}>Ask the Record Assistant</Text>
                  <Text style={styles.aiSub}>"When was my last CBC test?"</Text>
                </View>
                <Ionicons name="sparkles" size={24} color={colors.white} />
              </Pressable>
            </LinearGradient>

            {/* Horizontal Scrollable Category Filter Chips */}
            <View style={styles.chipsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsScrollContent}
              >
                {allCategories.map((c) => (
                  <Pressable
                    key={c.label}
                    onPress={() => setCategory(c.id)}
                    style={[styles.filterChip, category === c.id && styles.filterChipActive]}
                  >
                    <Text
                      style={[
                        type.smallMedium,
                        { color: category === c.id ? colors.white : colors.ink2 },
                      ]}
                    >
                      {c.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Timeline Header Row */}
            <View style={styles.timelineHeader}>
              <Text style={[type.title, { color: colors.ink }]}>Timeline</Text>
              <Text style={[type.caption, { color: colors.slate }]}>
                {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RecordRow
            record={item}
            onPress={() => navigation.navigate('RecordDetail', { recordId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconCircle name="document-outline" size={56} iconSize={26} />
            <Text style={[type.body, { color: colors.slate, marginTop: spacing.md, textAlign: 'center' }]}>
              No records found for {activePerson.name}
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate('AddDocument')}>
        <LinearGradient
          colors={colors.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabInner}
        >
          <Ionicons name="add" size={28} color={colors.white} />
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  headerContainer: {
    marginBottom: spacing.xs,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greetingWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  greetingSub: {
    ...type.small,
    color: colors.slate,
  },
  greetingTitle: {
    ...type.h2,
    color: colors.ink,
    marginTop: 2,
  },
  actionsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.paperDim,
    paddingRight: spacing.xs,
    borderRadius: radius.pill,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fontFamily.bodySemibold,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.paperDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  searchInput: {
    marginBottom: spacing.md,
  },
  aiCard: {
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    ...shadow.card,
  },
  aiCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  aiTitle: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fontFamily.bodySemibold,
  },
  aiSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginTop: 2,
  },
  chipsContainer: {
    marginHorizontal: -spacing.xl,
    marginBottom: spacing.md,
  },
  chipsScrollContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    height: 34,
    borderRadius: radius.pill,
    justifyContent: 'center',
    backgroundColor: colors.paperDim,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.tealDark,
    borderColor: colors.tealDark,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: spacing.sm,
  },
  recordCard: {
    marginBottom: spacing.sm,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: 24,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.float,
  },
});
