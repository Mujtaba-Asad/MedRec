import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { colors, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddVoiceNote'>;

const BARS = Array.from({ length: 28 }, () => Math.random() * 0.7 + 0.3);

export default function AddVoiceNoteScreen({ navigation, route }: Props) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [done, setDone] = useState(!!route.params?.recordId);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (recording) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.15, duration: 500, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
    return () => { if (interval) clearInterval(interval); };
  }, [recording]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <ScreenContainer scroll={false}>
      <Header onBack={() => navigation.goBack()} title="Voice Note" />

      <View style={styles.center}>
        <View style={styles.waveform}>
          {BARS.map((h, i) => (
            <View key={i} style={[styles.bar, { height: 60 * h, backgroundColor: i < 14 || done ? colors.tealDark : colors.border }]} />
          ))}
        </View>

        <Text style={[type.h2, { color: colors.ink, marginTop: spacing.xl, fontVariant: ['tabular-nums'] }]}>{mm}:{ss}</Text>
        <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs }]}>
          {done ? 'Attached to this record' : recording ? 'Recording…' : 'Describe symptoms, instructions, or reminders'}
        </Text>

        {!done && (
          <Pressable
            onPress={() => {
              if (recording) { setRecording(false); setDone(true); }
              else setRecording(true);
            }}
            style={{ marginTop: spacing.xxl }}
          >
            <Animated.View style={[styles.recordBtn, recording && styles.recordBtnActive, { transform: [{ scale: pulse }] }]}>
              <Ionicons name={recording ? 'stop' : 'mic'} size={28} color={colors.white} />
            </Animated.View>
          </Pressable>
        )}
      </View>

      {done && (
        <View style={{ padding: spacing.xl }}>
          <Button label="Save Voice Note" onPress={() => navigation.goBack()} />
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  waveform: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 60 },
  bar: { width: 4, borderRadius: 2 },
  recordBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center' },
  recordBtnActive: { backgroundColor: colors.ink },
});
