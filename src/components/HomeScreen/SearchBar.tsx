import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import searchIcon from '@assets/icons/search.png';

function SearchBar(): React.JSX.Element {
  return (
    <View style={styles.textInput}>
      <TextInput
        editable
        placeholder="전시회, 작가 검색"
        placeholderTextColor="#DADADA"
        style={[styles.text, {fontWeight: '400'}]}
      />
      <TouchableOpacity>
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
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: '#292929',
    marginRight: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
