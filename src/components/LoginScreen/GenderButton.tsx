import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type genderProps = {
  title: string;
  onPress: () => void;
  value?: boolean;
};

const windowWidth = Dimensions.get('window').width;

function GenderButton(props: genderProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.buttonBox, {backgroundColor: props.value ? '#FFD600' : '#292929'}]}>
        <Text style={[styles.genderText, {color: props.value ? '#030303' : 'white'}]}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default GenderButton;

const styles = StyleSheet.create({
  buttonBox: {
    width: (windowWidth - 60) / 2,
    height: 50,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  genderText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
