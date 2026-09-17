// Landing page pairs Playfair Display (display serif) with Inter (body/UI).
// @expo-google-fonts + expo-font registers each weight under these exact
// family names via useFonts() in App.tsx — consistently on native (real font
// loading) and web (injected @font-face) — so the same key works everywhere.
export const fontFamily = {
  display: 'PlayfairDisplay_700Bold',
  displayMedium: 'PlayfairDisplay_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  // Unused in any style today (kept for API completeness); points at the
  // heaviest weight we actually load so it never references a missing font.
  bodyBold: 'Inter_600SemiBold',
};

export const type = {
  h1: { fontFamily: fontFamily.display, fontSize: 30, lineHeight: 36 },
  h2: { fontFamily: fontFamily.display, fontSize: 24, lineHeight: 30 },
  h3: { fontFamily: fontFamily.displayMedium, fontSize: 20, lineHeight: 26 },
  title: { fontFamily: fontFamily.bodySemibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fontFamily.body, fontSize: 15, lineHeight: 21 },
  bodyMedium: { fontFamily: fontFamily.bodyMedium, fontSize: 15, lineHeight: 21 },
  small: { fontFamily: fontFamily.body, fontSize: 13, lineHeight: 18 },
  smallMedium: { fontFamily: fontFamily.bodyMedium, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fontFamily.body, fontSize: 11, lineHeight: 15 },
  button: { fontFamily: fontFamily.bodySemibold, fontSize: 16, lineHeight: 20 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#0F1317',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  float: {
    shadowColor: '#0F1317',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8,
  },
};
