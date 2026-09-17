import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import DatePickerInput from '../../components/DatePickerInput';
import { colors, radius, shadow, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import { ProfileType } from '../../data/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FamilyProfiles'>;

const RELATIONS: ProfileType[] = ['child', 'parent', 'spouse', 'other'];
const PALETTE = ['#2DA6B2', '#43C871', '#D98C2B', '#5B6169', '#8E6FCB'];

export default function FamilyProfilesScreen({ navigation }: Props) {
  const { familyProfiles, activeProfileId, setActiveProfileId, addFamilyProfile, records } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<ProfileType>('child');
  const [dob, setDob] = useState('');

  return (
    <ScreenContainer>
      <Header onBack={() => navigation.goBack()} title="Family Profiles" />
      <Text style={[type.body, { color: colors.slate, marginBottom: spacing.xl }]}>
        Switch between profiles to view and add records for each family member — all stored on this one device.
      </Text>

      {familyProfiles.map((fp) => {
        const count = records.filter((r) => r.profileId === fp.id).length;
        const active = fp.id === activeProfileId;
        return (
          <Card
            key={fp.id}
            style={{ marginBottom: spacing.md, ...(active ? { borderColor: colors.tealDark, borderWidth: 1.5 } : {}) }}
            onPress={() => { setActiveProfileId(fp.id); navigation.goBack(); }}
          >
            <View style={styles.row}>
              <View style={[styles.avatar, { backgroundColor: fp.avatarColor }]}>
                <Text style={styles.avatarText}>{fp.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[type.bodyMedium, { color: colors.ink }]}>{fp.name}</Text>
                <Text style={[type.small, { color: colors.slate, marginTop: 2 }]}>
                  {fp.relation === 'self' ? 'Primary account' : fp.relation.charAt(0).toUpperCase() + fp.relation.slice(1)} · {count} record{count === 1 ? '' : 's'}
                </Text>
              </View>
              {active ? <Ionicons name="checkmark-circle" size={22} color={colors.tealDark} /> : null}
            </View>
          </Card>
        );
      })}

      <Pressable style={styles.addRow} onPress={() => setAddOpen(true)}>
        <View style={styles.addIcon}><Ionicons name="add" size={20} color={colors.tealDark} /></View>
        <Text style={[type.bodyMedium, { color: colors.tealDark }]}>Add Family Member</Text>
      </Pressable>

      <Modal visible={addOpen} animationType="slide" transparent onRequestClose={() => setAddOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={[type.h3, { color: colors.ink, marginBottom: spacing.lg }]}>Add Family Member</Text>
            <Input label="Full Name" value={name} onChangeText={setName} containerStyle={{ marginBottom: spacing.lg }} />
            <Text style={[type.smallMedium, { color: colors.ink2, marginBottom: spacing.xs }]}>Relationship</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap' }}>
              {RELATIONS.map((r) => (
                <Pressable key={r} onPress={() => setRelation(r)} style={[styles.chip, relation === r && styles.chipActive]}>
                  <Text style={[type.small, { color: relation === r ? colors.white : colors.ink2 }]}>{r}</Text>
                </Pressable>
              ))}
            </View>
            <DatePickerInput label="Date of Birth" value={dob} onChangeText={setDob} containerStyle={{ marginBottom: spacing.xl }} />
            <Button
              label="Create Profile"
              disabled={name.trim().length < 2}
              onPress={() => {
                const initials = name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
                addFamilyProfile({
                  id: `fp${Date.now()}`, name, relation, dob,
                  avatarColor: PALETTE[Math.floor(Math.random() * PALETTE.length)], initials,
                });
                setAddOpen(false); setName(''); setDob('');
              }}
            />
            <View style={{ height: spacing.sm }} />
            <Button label="Cancel" variant="ghost" onPress={() => setAddOpen(false)} />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontWeight: '700' },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  addIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.infoBg, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: colors.teal, borderStyle: 'dashed' },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,19,23,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.paper, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, ...shadow.float },
  chip: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
});
