export const dependencies = {
  // Conditionally exclude 'react-native-flipper' for iOS builds if NO_FLIPPER is set
  // eslint-disable-next-line no-undef
  ...(process.env.NO_FLIPPER === '1' ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
};
