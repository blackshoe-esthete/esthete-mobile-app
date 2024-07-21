import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';
import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  resolve: {
    extraNodeModules: {
      '@components': _resolve(__dirname, 'src/components/'),
      '@screens': _resolve(__dirname, 'src/screens/'),
      '@assets': _resolve(__dirname, 'src/assets/'),
      '@utils': _resolve(__dirname, 'src/utils/'),
      '@constants': _resolve(__dirname, 'src/constants/'),
      '@hooks': _resolve(__dirname, 'src/hooks/'),
      '@navigations': _resolve(__dirname, 'src/navigations/'),
      '#types': _resolve(__dirname, 'src/types/'),
      '@apis': _resolve(__dirname, 'src/apis/'),
      '@store': _resolve(__dirname, 'src/store/'),
    },
  },
};

export default mergeConfig(getDefaultConfig(__dirname), config);
