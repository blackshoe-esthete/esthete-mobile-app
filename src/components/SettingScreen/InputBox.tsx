import { forwardRef } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type inputProp = {
  onChange: (e: any) => void;
  placeholder?: string;
  height?: number;
  customColor?: string;
  marginTop?: number;
  value?: string;
  onPressOut?: () => void;
  multiline?: boolean;
  paddingTop?: number;
};

const InputBox = forwardRef(function InputBox<TextInput, InputProp>(prop: inputProp, ref: any){
  return(
    <View style={[styles.inputContainer, {marginTop: prop?.marginTop}]}>
    <TextInput
      placeholder={prop?.placeholder}
      textAlignVertical='top'
      placeholderTextColor='#E9E9E9'
      style={[styles.inputText, {minHeight: prop?.height, paddingTop: prop?.paddingTop}]}
      onChangeText={prop.onChange}
      ref={ref}
      value={prop.value}
      onPressOut={prop.onPressOut}
      multiline={prop?.multiline}
    />
  </View>
  );
});

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    backgroundColor: '#292929',
    paddingHorizontal: 20,
    display: 'flex',
    // alignItems: 'flex-start',
    
    borderRadius: 10,
  },
  inputText: {
    color: '#E9E9E9',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.32,
    // backgroundColor: 'white',
  },
});
