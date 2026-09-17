import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { colors, radius, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AIAssistant'>;

interface Msg { id: string; from: 'user' | 'ai'; text: string; }

const SUGGESTIONS = [
  'When was my last CBC test?',
  'Do I have any drug allergies on file?',
  'Summarize my last cardiology visit',
];

export default function AIAssistantScreen({ navigation }: Props) {
  const { records, profile } = useApp();
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'm0', from: 'ai', text: `Hi${profile.fullName ? ' ' + profile.fullName.split(' ')[0] : ''}, I'm your Record Assistant. Ask me anything about your medical history — I only look at what's stored on this device.` },
  ]);
  const [input, setInput] = useState('');

  const answer = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('cbc') || lower.includes('blood count')) {
      const r = records.find((r) => r.title.toLowerCase().includes('blood count'));
      return r ? `Your last CBC was on ${r.date} at ${r.provider}. All values were within normal range — hemoglobin 14.2 g/dL.` : "I couldn't find a CBC test in your records yet.";
    }
    if (lower.includes('allerg')) {
      return profile.allergies.length ? `You've noted these allergies: ${profile.allergies.join(', ')}.` : "You haven't added any allergies to your profile yet.";
    }
    if (lower.includes('cardio') || lower.includes('heart')) {
      const r = records.find((r) => r.tags.includes('Cardiology'));
      return r ? `${r.date}: ${r.summary}` : "I couldn't find a cardiology visit on file.";
    }
    return `Based on your ${records.length} saved records, I couldn't find an exact match — try asking about a specific test, medication, or doctor.`;
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u${Date.now()}`, from: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { id: `a${Date.now()}`, from: 'ai', text: answer(text) }]);
    }, 600);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} style={{ flex: 1, backgroundColor: colors.paper }}>
      <Header onBack={() => navigation.goBack()} title="Record Assistant" subtitle="On-device · private" />
      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing.xl, gap: spacing.md }}
        renderItem={({ item }) =>
          item.from === 'ai' ? (
            <View style={styles.aiRow}>
              <LinearGradient colors={colors.gradient} style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={14} color={colors.white} />
              </LinearGradient>
              <View style={styles.aiBubble}><Text style={[type.body, { color: colors.ink }]}>{item.text}</Text></View>
            </View>
          ) : (
            <View style={styles.userRow}>
              <View style={styles.userBubble}><Text style={[type.body, { color: colors.white }]}>{item.text}</Text></View>
            </View>
          )
        }
        ListFooterComponent={
          messages.length < 2 ? (
            <View style={{ gap: spacing.sm, marginTop: spacing.sm }}>
              {SUGGESTIONS.map((s) => (
                <Pressable key={s} style={styles.suggestion} onPress={() => send(s)}>
                  <Text style={[type.small, { color: colors.tealDark }]}>{s}</Text>
                </Pressable>
              ))}
            </View>
          ) : null
        }
      />
      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your records…"
          placeholderTextColor={colors.mist}
          style={styles.input}
          onSubmitEditing={() => send(input)}
        />
        <Pressable style={styles.sendBtn} onPress={() => send(input)}>
          <Ionicons name="arrow-up" size={18} color={colors.white} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aiRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-end', maxWidth: '90%' },
  aiAvatar: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  aiBubble: { backgroundColor: colors.card, borderRadius: radius.lg, borderBottomLeftRadius: 4, padding: spacing.md, borderWidth: 1, borderColor: colors.borderSoft, flexShrink: 1 },
  userRow: { alignItems: 'flex-end' },
  userBubble: { backgroundColor: colors.ink, borderRadius: radius.lg, borderBottomRightRadius: 4, padding: spacing.md, maxWidth: '85%' },
  suggestion: { backgroundColor: colors.infoBg, borderRadius: radius.pill, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, alignSelf: 'flex-start' },
  inputBar: { flexDirection: 'row', gap: spacing.sm, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.borderSoft, backgroundColor: colors.paper },
  input: { flex: 1, height: 46, borderRadius: radius.pill, backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, color: colors.ink },
  sendBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.tealDark, alignItems: 'center', justifyContent: 'center' },
});
