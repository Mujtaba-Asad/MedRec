// MedRec design tokens — derived from the brand mark (teal→green gradient cross)
// and the medrecapp.com landing page palette, so the app and marketing site feel
// like one product.

export const colors = {
  // Brand
  tealDark: '#2DA6B2',
  teal: '#3EBAC6',
  green: '#43C871',
  greenDeep: '#33B15E',
  gradient: ['#2DA6B2', '#43C871'] as const,

  // Ink / neutrals (warm, slightly off-black — matches landing page)
  ink: '#0F1317',
  ink2: '#171C21',
  ink3: '#272E34',
  slate: '#5B6169',
  mist: '#98A2A9',

  // Surfaces (warm paper tones, not pure white)
  paper: '#F7F5F0',
  paperDim: '#EFEBE2',
  cream: '#F3EFE6',
  card: '#FFFFFF',
  border: '#E7E2D6',
  borderSoft: '#EFEBE2',

  white: '#FFFFFF',

  // Semantic
  success: '#33B15E',
  successBg: '#E7F7EC',
  warning: '#D98C2B',
  warningBg: '#FBF0DE',
  danger: '#D64545',
  dangerBg: '#FBEAEA',
  info: '#2DA6B2',
  infoBg: '#E4F5F6',

  // Text on brand
  onBrand: '#FFFFFF',
};

export type AppColors = typeof colors;
