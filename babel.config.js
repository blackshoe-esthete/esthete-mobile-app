module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@navigations': './src/navigations',
          '@types': './src/types',
          '@apis': './src/apis',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
