import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  AudioModule,
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
  RecordingPresets,
  setAudioModeAsync,
} from 'expo-audio';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddVoiceNote'>;
type ScreenState = 'idle' | 'recording' | 'recorded';

const NUM_BARS = 32;
const MIN_BAR_FRACTION = 0.08;

export default function AddVoiceNoteScreen({ navigation, route }: Props) {
  const recordId = route.params?.recordId;
  const { updateRecord, addRecord, activeProfileId } = useApp();

  const [screenState, setScreenState] = useState<ScreenState>('idle');
  const [seconds, setSeconds] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder, 100);

  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulse = useRef(new Animated.Value(1)).current;
  const [bars, setBars] = useState<number[]>(Array(NUM_BARS).fill(MIN_BAR_FRACTION));

  // Request microphone permissions
  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setPermissionGranted(status.granted);
      } catch {
        setPermissionGranted(false);
      }
    })();
  }, []);

  // Live waveform visualization update while recording
  useEffect(() => {
    if (recorderState.isRecording) {
      const db = recorderState.metering ?? -60;
      const clamped = Math.max(-60, Math.min(0, db));
      const level = (clamped + 60) / 60;
      const barVal = Math.max(MIN_BAR_FRACTION, level > 0 ? level : Math.random() * 0.5 + 0.2);
      setBars((prev) => [...prev.slice(1), barVal]);
    }
  }, [recorderState.isRecording, recorderState.metering]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Pulse animation while recording
  useEffect(() => {
    if (screenState === 'recording') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.18, duration: 500, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [screenState, pulse]);

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setScreenState('recording');
      setSeconds(0);
      setRecordedUri(null);

      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (err) {
      console.warn('Failed to start recording', err);
    }
  }, [audioRecorder]);

  // Stop recording
  const stopRecording = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    try {
      await audioRecorder.stop();
      const uri = audioRecorder.uri;
      setRecordedUri(uri);

      if (uri) {
        player.replace({ uri });
      }

      await setAudioModeAsync({ allowsRecording: false });
      setScreenState('recorded');
    } catch (err) {
      console.warn('Failed to stop recording', err);
    }
  }, [audioRecorder, player]);

  // Play / Pause playback
  const togglePlayback = useCallback(() => {
    if (!recordedUri) return;

    if (playerStatus.playing) {
      player.pause();
    } else {
      if (playerStatus.currentTime >= playerStatus.duration && playerStatus.duration > 0) {
        player.seekTo(0);
      }
      player.play();
    }
  }, [recordedUri, player, playerStatus]);

  // Re-record
  const reRecord = useCallback(() => {
    player.pause();
    setRecordedUri(null);
    setScreenState('idle');
    setSeconds(0);
    setBars(Array(NUM_BARS).fill(MIN_BAR_FRACTION));
  }, [player]);

  // Delete voice note
  const deleteVoiceNote = useCallback(() => {
    player.pause();
    setRecordedUri(null);

    if (recordId) {
      updateRecord(recordId, { hasVoiceNote: false, voiceNoteUri: undefined });
    }

    setScreenState('idle');
    setSeconds(0);
    setBars(Array(NUM_BARS).fill(MIN_BAR_FRACTION));
    navigation.goBack();
  }, [recordId, updateRecord, navigation, player]);

  // Save voice note
  const saveVoiceNote = useCallback(() => {
    if (!recordedUri) return;

    if (recordId) {
      updateRecord(recordId, { hasVoiceNote: true, voiceNoteUri: recordedUri });
    } else {
      const id = `r${Date.now()}`;
      addRecord({
        id,
        profileId: activeProfileId,
        title: 'Voice Note',
        category: 'Other',
        provider: 'Self-recorded',
        date: new Date().toISOString().slice(0, 10),
        summary: `Voice recording — ${formatTime(seconds)}`,
        tags: ['Voice Note'],
        hasPhoto: false,
        hasVoiceNote: true,
        voiceNoteUri: recordedUri,
      });
    }

    navigation.goBack();
  }, [recordedUri, recordId, updateRecord, addRecord, activeProfileId, seconds, navigation]);

  // Helpers
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const playbackProgress =
    playerStatus.duration > 0 ? playerStatus.currentTime / playerStatus.duration : 0;

  // Permission not yet resolved
  if (permissionGranted === null) {
    return (
      <ScreenContainer scroll={false}>
        <Header onBack={() => navigation.goBack()} title="Voice Note" />
        <View style={styles.center}>
          <Text style={[type.body, { color: colors.slate }]}>Requesting microphone access…</Text>
        </View>
      </ScreenContainer>
    );
  }

  // Permission denied
  if (permissionGranted === false) {
    return (
      <ScreenContainer scroll={false}>
        <Header onBack={() => navigation.goBack()} title="Voice Note" />
        <View style={styles.center}>
          <View style={styles.permDeniedIcon}>
            <Ionicons name="mic-off-outline" size={40} color={colors.danger} />
          </View>
          <Text style={[type.h2, { color: colors.ink, marginTop: spacing.xl, textAlign: 'center' }]}>
            Microphone Access Required
          </Text>
          <Text
            style={[
              type.body,
              { color: colors.slate, marginTop: spacing.sm, textAlign: 'center', paddingHorizontal: spacing.xl },
            ]}
          >
            Please enable microphone access in your device settings to record voice notes.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false}>
      <Header onBack={() => navigation.goBack()} title="Voice Note" />

      <View style={styles.center}>
        {/* Waveform */}
        <View style={styles.waveform}>
          {bars.map((h, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: 60 * h,
                  backgroundColor:
                    screenState === 'recording'
                      ? colors.tealDark
                      : screenState === 'recorded'
                        ? i / NUM_BARS <= playbackProgress
                          ? colors.tealDark
                          : colors.border
                        : colors.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Timer / Position */}
        <Text
          style={[
            type.h2,
            { color: colors.ink, marginTop: spacing.xl, fontVariant: ['tabular-nums'] },
          ]}
        >
          {screenState === 'recorded'
            ? `${formatSec(playerStatus.currentTime)} / ${formatSec(playerStatus.duration)}`
            : `${mm}:${ss}`}
        </Text>

        <Text style={[type.small, { color: colors.slate, marginTop: spacing.xs, textAlign: 'center' }]}>
          {screenState === 'idle' && 'Tap the button to start recording'}
          {screenState === 'recording' && 'Recording… tap to stop'}
          {screenState === 'recorded' && (playerStatus.playing ? 'Playing back…' : 'Recording complete')}
        </Text>

        {/* Controls */}
        <View style={styles.controlsRow}>
          {screenState === 'idle' && (
            <Pressable onPress={startRecording}>
              <View style={[styles.recordBtn, styles.recordBtnIdle]}>
                <Ionicons name="mic" size={30} color={colors.white} />
              </View>
            </Pressable>
          )}

          {screenState === 'recording' && (
            <Pressable onPress={stopRecording}>
              <Animated.View style={[styles.recordBtn, styles.recordBtnActive, { transform: [{ scale: pulse }] }]}>
                <Ionicons name="stop" size={28} color={colors.white} />
              </Animated.View>
            </Pressable>
          )}

          {screenState === 'recorded' && (
            <View style={styles.playbackControls}>
              {/* Re-record */}
              <Pressable onPress={reRecord} style={styles.secondaryBtn}>
                <View style={styles.secondaryBtnInner}>
                  <Ionicons name="refresh" size={22} color={colors.tealDark} />
                </View>
                <Text style={[type.caption, { color: colors.slate, marginTop: 6 }]}>Re-record</Text>
              </Pressable>

              {/* Play / Pause */}
              <Pressable onPress={togglePlayback}>
                <View style={[styles.recordBtn, styles.playBtn]}>
                  <Ionicons name={playerStatus.playing ? 'pause' : 'play'} size={30} color={colors.white} />
                </View>
              </Pressable>

              {/* Delete */}
              <Pressable onPress={deleteVoiceNote} style={styles.secondaryBtn}>
                <View style={[styles.secondaryBtnInner, { backgroundColor: colors.dangerBg }]}>
                  <Ionicons name="trash-outline" size={22} color={colors.danger} />
                </View>
                <Text style={[type.caption, { color: colors.slate, marginTop: 6 }]}>Delete</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* Save button */}
      {screenState === 'recorded' && (
        <View style={{ padding: spacing.xl }}>
          <Button label="Save Voice Note" onPress={saveVoiceNote} />
        </View>
      )}
    </ScreenContainer>
  );
}

// Helpers
function formatTime(totalSeconds: number): string {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function formatSec(secondsVal: number): string {
  const totalSec = Math.floor(secondsVal || 0);
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 64,
    paddingHorizontal: spacing.lg,
  },
  bar: {
    flex: 1,
    minWidth: 3,
    borderRadius: 2,
  },
  controlsRow: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  recordBtnIdle: {
    backgroundColor: colors.danger,
  },
  recordBtnActive: {
    backgroundColor: colors.ink,
  },
  playBtn: {
    backgroundColor: colors.tealDark,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxl,
  },
  secondaryBtn: {
    alignItems: 'center',
  },
  secondaryBtnInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permDeniedIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
