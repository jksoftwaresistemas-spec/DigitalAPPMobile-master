// constants/themes.ts
import { Platform } from 'react-native';

const brandBlue = '#091e56';
const brandYellow = '#f3b41b';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    tint: brandBlue,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: brandBlue,
    primary: brandBlue,
    secondary: brandYellow,
  },
  dark: {
    text: '#ECEDEE',
    background: '#091e56',
    tint: brandYellow,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: brandYellow,
    primary: brandYellow,
    secondary: brandBlue,
  },
};

// Criamos uma constante para a fonte base para não repetir código
const primaryFont = 'Poppins';

export const Fonts = {
  // Configuração para uso geral
  default: {
    regular: primaryFont,
    medium: 'PoppinsSemiBold', // Ajustado para o nome que carregamos no _layout
    bold: 'PoppinsBold',
  },
  // Aqui resolvemos o conflito: Platform.select agora monta o objeto completo
  ...Platform.select({
    ios: {
      sans: primaryFont,
      serif: 'Georgia',
      rounded: primaryFont,
      mono: 'Courier New',
    },
    android: {
      sans: primaryFont,
      serif: 'serif',
      rounded: 'normal',
      mono: 'monospace',
    },
    web: {
      sans: `${primaryFont}, system-ui, -apple-system, sans-serif`,
      serif: "Georgia, serif",
      rounded: `${primaryFont}, sans-serif`,
      mono: "monospace",
    },
    default: {
      sans: primaryFont,
      serif: 'serif',
      rounded: 'normal',
      mono: 'monospace',
    }
  }),
};