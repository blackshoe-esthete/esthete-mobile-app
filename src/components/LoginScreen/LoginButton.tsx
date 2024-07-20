import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type buttonProp = {
  color: string;
  title: string;
  navigation?: () => void;
  onPress?: () => void;
};

const windowWidth = Dimensions.get('window').width;

function LoginButton(props: buttonProp): React.JSX.Element {
  return (
    <TouchableOpacity onPress={() => {
      if(props.navigation){
        return props.navigation();
      }else if(props.onPress){
        return props.onPress();
      }
    }}>
      <View style={[styles.button, {backgroundColor: props.color}]}>
        <Text style={styles.buttonTitle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    width: (windowWidth*9/10 - 20)/2,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontFamily: "Gothic A1",
    fontSize: 16,
    fontWeight: '500', 
    letterSpacing: -0.32
  }
});
