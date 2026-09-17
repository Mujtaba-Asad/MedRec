import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, spacing, type } from '../../theme';
import { useApp } from '../../data/AppContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConsultationCall'>;

export default function ConsultationCallScreen({ navigation, route }: Props) {
  const { doctors } = useApp();
  const doctor = doctors.find((d) => d.id === route.params.doctorId);
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <View style={styles.wrap}>
      <View style={styles.remoteVideo}>
        <View style={[styles.bigAvatar, { backgroundColor: doctor?.avatarColor }]}>
          <Text style={styles.bigAvatarText}>{doctor?.initials}</Text>
        </View>
        <Text style={[type.title, { color: colors.white, marginTop: spacing.md }]}>{doctor?.name}</Text>
        <Text style={[type.small, { color: 'rgba(255,255,255,0.7)', marginTop: spacing.xs }]}>{mm}:{ss}</Text>
      </View>

      <View style={styles.selfView}>
        <Ionicons name="person" size={26} color="rgba(255,255,255,0.6)" />
      </View>

      <View style={styles.controls}>
        <Pressable style={[styles.ctrlBtn, muted && styles.ctrlBtnActive]} onPress={() => setMuted((m) => !m)}>
          <Ionicons name={muted ? 'mic-off' : 'mic'} size={22} color={colors.white} />
        </Pressable>
        <Pressable style={[styles.ctrlBtn, videoOff && styles.ctrlBtnActive]} onPress={() => setVideoOff((v) => !v)}>
          <Ionicons name={videoOff ? 'videocam-off' : 'videocam'} size={22} color={colors.white} />
        </Pressable>
        <Pressable style={styles.endBtn} onPress={() => navigation.replace('RateDoctor', { doctorId: route.params.doctorId })}>
          <Ionicons name="call" size={22} color={colors.white} style={{ transform: [{ rotate: '135deg' }] }} />
        </Pressable>
        <Pressable style={styles.ctrlBtn} onPress={() => {}}>
          <Ionicons name="chatbubble-outline" size={22} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#12181D' },
  remoteVideo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigAvatar: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  bigAvatarText: { color: colors.white, fontSize: 34, fontWeight: '700' },
  selfView: { position: 'absolute', top: 60, right: 20, width: 84, height: 120, borderRadius: 16, backgroundColor: '#1F2830', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  controls: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg, paddingBottom: spacing.xxxl, paddingTop: spacing.lg },
  ctrlBtn: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  ctrlBtnActive: { backgroundColor: colors.white + '30' },
  endBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center' },
});
