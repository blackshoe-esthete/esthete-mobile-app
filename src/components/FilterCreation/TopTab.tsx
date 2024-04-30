import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import backspaceIcon from '@assets/icons/backspace_white.png';

interface TopTabProps {
  text: string;
}

function TopTab({text}: TopTabProps): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.topTab}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={backspaceIcon}
          style={styles.backspaceIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default TopTab;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    paddingVertical: 20,
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
