import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RateDoctor'>;

const TAGS = ['On time', 'Clear explanation', 'Friendly', 'Good listener', 'Thorough'];

export default function RateDoctorScreen({ navigation, route }: Props) {
  const { doctors } = useApp();
  const doctor = doctors.find((d) => d.id === route.params.doctorId);
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [review, setReview] = useState('');

  return (
    <ScreenContainer scroll>
      <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
        <View style={[styles.avatar, { backgroundColor: doctor?.avatarColor }]}>
          <Text style={styles.avatarText}>{doctor?.initials}</Text>
        </View>
        <Text style={[type.h3, { color: colors.ink, marginTop: spacing.lg }]}>How was your consultation?</Text>
        <Text style={[type.body, { color: colors.slate, marginTop: spacing.xs }]}>with {doctor?.name}</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Pressable key={i} onPress={() => setRating(i)} hitSlop={6}>
              <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={34} color={colors.warning} />
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.tagsRow}>
        {TAGS.map((t) => (
          <Pressable
            key={t}
            onPress={() => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))}
            style={[styles.tag, tags.includes(t) && styles.tagActive]}
          >
            <Text style={[type.small, { color: tags.includes(t) ? colors.white : colors.ink2 }]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Add a comment (optional)"
        placeholderTextColor={colors.mist}
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
        style={styles.textarea}
      />

      <View style={{ marginTop: spacing.xxl }}>
        <Button
          label="Submit Review"
          disabled={rating === 0}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        />
        <View style={{ height: spacing.sm }} />
        <Button label="Skip" variant="ghost" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.white, fontSize: 26, fontWeight: '700' },
  starsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.xl },
  tag: { paddingHorizontal: spacing.md, height: 36, borderRadius: radius.pill, justifyContent: 'center', backgroundColor: colors.paperDim, borderWidth: 1, borderColor: colors.border },
  tagActive: { backgroundColor: colors.tealDark, borderColor: colors.tealDark },
  textarea: { marginTop: spacing.xl, height: 100, borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.card, padding: spacing.md, color: colors.ink, textAlignVertical: 'top' },
});
