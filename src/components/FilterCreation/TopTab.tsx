import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import backspaceIcon from '@assets/icons/backspace_white.png';
import {useFilterCreationStore} from '@store/filterCreationStore';

interface TopTabProps {
  text: string;
  to: string;
}

function TopTab({text, to}: TopTabProps): React.JSX.Element {
  const navigation = useNavigation();
  const {selectedImageUri, setSelectedImageUri, setAdditionalImageUriEmpty} = useFilterCreationStore();

  const onPressBack = () => {
    if (to === 'FilterCreationDesc') {
      setSelectedImageUri('');
    }
    if (to === 'CameraPage' && text === '임시 저장') {
      setAdditionalImageUriEmpty();
    }
    navigation.goBack();
  };

  // 선택된 이미지가 없는 경우에만 네비게이션을 처리
  const onPressNext = () => {
    if (to === 'FilterCreationDesc') {
      if (selectedImageUri) {
        navigation.navigate(to as never); // Cast 'to' to 'never' type
      } else {
        // 선택된 이미지가 없는 경우 처리할 로직 추가
        Alert.alert('이미지를 선택해주세요.');
      }
    } else {
      navigation.navigate(to as never); // Cast 'to' to 'never' type
    }
  };

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
