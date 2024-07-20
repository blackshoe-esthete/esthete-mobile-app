import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#FFD600" />
  </View>
);

const styles = StyleSheet.create({
  // 기존 스타일
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000,
  },
});
