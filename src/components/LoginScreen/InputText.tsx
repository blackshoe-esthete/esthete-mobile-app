import React, { useEffect, useState } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type inputProp = {
  type?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  placeHolder: string;
  margin?: number;
  color?: string;
  security?: boolean;
  value?: string;
  onChange?: (text: string) => void;
};
function InputText(props: inputProp): React.JSX.Element {
  const [text, setText] = useState(props.value || '');

  useEffect(() => {
    setText(props.value || '');
    console.log(props.value);
  }, [props.value]);

  const handleChangeText = (newText: string) => {
    setText(newText);
    if (props.onChange) {
      props.onChange(newText);
    }
  };
  
  return (
    <TextInput
      placeholder={props.placeHolder}
      style={[styles.inputBox, {marginTop: props.margin, color: props.color || '#E9E9E9'}]}
      placeholderTextColor="#E9E9E9"
      value={text}
      keyboardType={props.type || 'default'}
      secureTextEntry={props.security}
      onChangeText={handleChangeText}
    />
  );
}

export default InputText;

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 70,
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
  },
});
