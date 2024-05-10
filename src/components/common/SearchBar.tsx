import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, TextInput, TextStyle, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import backIcon from '@assets/icons/backspace_white.png';

type SearchBarProps = {
  iconSource: File | Blob | string;
  to: string;
  back?: boolean;
  placeHolder?: string;
};

function SearchBar({iconSource, to, back, placeHolder}: SearchBarProps): React.JSX.Element {
  const navigation = useNavigation();
  if (back) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
        <View style={[styles.textInput, {marginTop: 0, width: '95%'}]}>
          <TextInput
            editable
            placeholder={placeHolder ? placeHolder : '전시회, 작가 검색'}
            placeholderTextColor="#DADADA"
            style={[styles.text, {fontWeight: '400'}]}
          />
          <TouchableOpacity onPress={() => navigation.navigate(to)}>
            <Image
              source={iconSource}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.textInput}>
        <TextInput
          editable
          placeholder="전시회, 작가 검색"
          placeholderTextColor="#DADADA"
          style={[styles.text, {fontWeight: '400'}]}
        />
        <TouchableOpacity onPress={() => navigation.navigate(to)}>
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
