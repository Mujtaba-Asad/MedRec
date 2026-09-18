import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { colors, radius, spacing, type } from '../../theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddDocument'>;

export default function AddDocumentScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const scanAnim = useRef(new Animated.Value(0)).current;

  // Request camera permission on mount
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Scanning line animation
  useEffect(() => {
    if (!capturedUri) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
          Animated.timing(scanAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      scanAnim.stopAnimation();
    }
  }, [capturedUri, scanAnim]);

  // Take photo with embedded camera
  const takePhoto = useCallback(async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) return;
    }

    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.85,
        });
        if (photo?.uri) {
          setCapturedUri(photo.uri);
        }
      } catch (err) {
        console.warn('Failed to take picture in app', err);
      }
    }
  }, [permission, requestPermission]);

  // Pick from gallery
  const pickFromGallery = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
      allowsEditing: true,
      aspect: [3, 4],
    });

    if (!result.canceled && result.assets[0]) {
      setCapturedUri(result.assets[0].uri);
    }
  }, []);

  // Proceed to confirm
  const proceedToConfirm = useCallback(() => {
    navigation.navigate('ConfirmDetails', {
      imageCaptured: true,
      photoUri: capturedUri ?? undefined,
    });
  }, [navigation, capturedUri]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedUri(null);
  }, []);

  const scanLineTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-140, 140],
  });

  // Permission denied state
  if (permission && !permission.granted && !capturedUri) {
    return (
      <ScreenContainer scroll={false}>
        <Header onBack={() => navigation.goBack()} title="Add Document" />

        <View style={styles.viewfinder}>
          <View style={styles.permDeniedIcon}>
            <Ionicons name="camera-outline" size={40} color={colors.danger} />
          </View>
          <Text style={[styles.viewfinderText, { marginTop: spacing.lg }]}>
            Camera access is required to scan documents
          </Text>
          <Pressable style={styles.retryPermBtn} onPress={requestPermission}>
            <Text style={[type.smallMedium, { color: colors.tealDark }]}>Grant Permission</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
          <Card style={{ flex: 1, alignItems: 'center' }} onPress={pickFromGallery}>
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

  // Photo captured — show preview
  if (capturedUri) {
    return (
      <ScreenContainer scroll={false}>
        <Header onBack={() => navigation.goBack()} title="Review Photo" />

        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedUri }} style={styles.previewImage} resizeMode="cover" />
          <View style={styles.previewBadge}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={[type.smallMedium, { color: colors.success }]}>Photo captured</Text>
          </View>
        </View>

        <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
          <Button label="Use This Photo" onPress={proceedToConfirm} />
          <Button
            label="Retake Photo"
            variant="outline"
            icon={<Ionicons name="camera-outline" size={18} color={colors.ink} />}
            onPress={retakePhoto}
          />
        </View>
      </ScreenContainer>
    );
  }

  // Default — embedded live camera viewfinder state
  return (
    <ScreenContainer scroll={false}>
      <Header onBack={() => navigation.goBack()} title="Add Document" />

      <View style={styles.viewfinder}>
        {permission?.granted ? (
          <CameraView ref={cameraRef} style={StyleSheet.absoluteFill as object} facing="back" />
        ) : null}

        {/* Viewfinder Overlay Frame */}
        <View style={styles.overlayTextContainer}>
          <Text style={styles.viewfinderText}>Line up the report inside the frame</Text>
        </View>

        <View style={styles.corner1} />
        <View style={styles.corner2} />
        <View style={styles.corner3} />
        <View style={styles.corner4} />

        {/* Animated scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            { transform: [{ translateY: scanLineTranslateY }] },
          ]}
        />
      </View>

      <Pressable style={styles.shutterWrap} onPress={takePhoto}>
        <LinearGradient colors={colors.gradient} style={styles.shutter}>
          <Ionicons name="camera" size={26} color={colors.white} />
        </LinearGradient>
      </Pressable>
      <Text style={[type.small, { color: colors.slate, textAlign: 'center', marginTop: spacing.sm }]}>
        Tap to capture
      </Text>

      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
        <Card style={{ flex: 1, alignItems: 'center' }} onPress={pickFromGallery}>
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
    height: 340,
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  overlayTextContainer: {
    position: 'absolute',
    top: 12,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    zIndex: 10,
  },
  viewfinderText: {
    color: 'rgba(255,255,255,0.9)',
    ...type.small,
  },
  corner1: {
    position: 'absolute', top: 24, left: 24,
    width: CORNER, height: CORNER,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderColor: colors.teal, borderTopLeftRadius: 8,
    zIndex: 10,
  },
  corner2: {
    position: 'absolute', top: 24, right: 24,
    width: CORNER, height: CORNER,
    borderTopWidth: 3, borderRightWidth: 3,
    borderColor: colors.teal, borderTopRightRadius: 8,
    zIndex: 10,
  },
  corner3: {
    position: 'absolute', bottom: 24, left: 24,
    width: CORNER, height: CORNER,
    borderBottomWidth: 3, borderLeftWidth: 3,
    borderColor: colors.teal, borderBottomLeftRadius: 8,
    zIndex: 10,
  },
  corner4: {
    position: 'absolute', bottom: 24, right: 24,
    width: CORNER, height: CORNER,
    borderBottomWidth: 3, borderRightWidth: 3,
    borderColor: colors.teal, borderBottomRightRadius: 8,
    zIndex: 10,
  },
  scanLine: {
    position: 'absolute',
    left: 28,
    right: 28,
    height: 2,
    backgroundColor: colors.teal,
    opacity: 0.8,
    zIndex: 10,
  },
  shutterWrap: { alignItems: 'center', marginTop: spacing.xl },
  shutter: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  previewContainer: {
    flex: 1,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginTop: spacing.md,
    backgroundColor: colors.ink,
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  previewBadge: {
    position: 'absolute',
    bottom: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  permDeniedIcon: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(214,69,69,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  retryPermBtn: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.infoBg,
  },
});
