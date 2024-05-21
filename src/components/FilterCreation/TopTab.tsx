import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import backspaceIcon from '@assets/icons/backspace_white.png';
import {useFilterCreationStore} from '@store/filterCreationStore';

interface TopTabProps {
  text: string;
  to: string;
  onPressBack: () => void;
  onPressNext: () => void;
}

function TopTab({text, to, onPressBack, onPressNext}: TopTabProps): React.JSX.Element {
  return (
    <View style={styles.topTab}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={backspaceIcon} style={styles.backspaceIcon} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNext}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TopTab;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    paddingVertical: 19,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backspaceIcon: {width: 20, height: 30},
  text: {
    color: '#E9E9E9',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
