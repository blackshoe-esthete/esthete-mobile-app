import React, { PropsWithChildren } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '@assets/icons/search.png';
import {useNavigation} from '@react-navigation/native';

interface searchBarProps{
  left?: number,
  label?: string,
  width?: number,
}

function SearchBar({left, label, width}: PropsWithChildren<searchBarProps>): React.JSX.Element {
  const navigation = useNavigation();
  const textLeft: TextStyle | undefined = left ? {marginLeft : left} : undefined;
  const boxWidth: TextStyle | undefined = width ? {width: width} : undefined;
  console.log(label);
  return (
    <View style={[styles.textInput, textLeft, boxWidth]}>
      <TextInput
        editable
        placeholder={label? label : "전시회, 작가 검색"}
        placeholderTextColor="#DADADA"
        style={[styles.text, {fontWeight: '400',}]}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image
          source={searchIcon}
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
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
