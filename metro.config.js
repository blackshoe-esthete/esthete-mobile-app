const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolve: {
    extraNodeModules: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@screens': path.resolve(__dirname, 'src/screens/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@navigations': path.resolve(__dirname, 'src/navigations/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      '@apis': path.resolve(__dirname, 'src/apis/'),
      '@store': path.resolve(__dirname, 'src/store/'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
