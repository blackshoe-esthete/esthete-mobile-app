import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type SearchBarProps = {
  iconSource: File | Blob | string;
  to: string;
};

function SearchBar({iconSource, to}: SearchBarProps): React.JSX.Element {
  const navigation = useNavigation();
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

export default SearchBar;

const styles = StyleSheet.create({
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
});