import React from 'react';
import {Alert, Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import backIcon from '@assets/icons/backspace_white.png';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import {useHomeSearchStore} from '@store/searchStore';

type SearchBarProps = {
  iconSource: ImageSourcePropType;
  to: any;
  back?: boolean;
  placeHolder?: string;
};

function SearchBar({iconSource, to, back, placeHolder}: SearchBarProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {keyword, setKeyword} = useHomeSearchStore();

  const onPressSearch = () => {
    if (keyword === '') {
      Alert.alert('검색어를 입력해주세요.');
      return;
    }
    navigation.navigate(to);
  };

  return (
    <View style={[styles.textInput, back && styles.wrapper]}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
      <TextInput
        editable
        value={keyword}
        onChangeText={setKeyword}
        placeholder={placeHolder ? placeHolder : '전시회, 작가 검색'}
        placeholderTextColor="#DADADA"
        style={[styles.text, {fontWeight: '400'}, back && {width: '85%'}]}
        onSubmitEditing={onPressSearch}
      />
      <TouchableOpacity onPress={onPressSearch}>
        <Image
          source={iconSource}
          style={{
            width: 18,
            height: 18,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#292929',
    marginHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    padding: 0,
    margin: 0,
  },
  icon: {
    width: 8.5,
    height: 20,
    // marginLeft: 20,
  },
});
