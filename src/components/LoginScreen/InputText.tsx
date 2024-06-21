import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type inputProp = {
  type: string;
  placeHolder: string;
  margin: number;
}
function InputText(props: inputProp):React.JSX.Element{
  return(
    <TextInput
      placeholder={props.placeHolder}
      style={[styles.inputBox, {marginTop: props.margin}]}
      placeholderTextColor="#E9E9E9"
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
    color: '#E9E9E9'
  }
})