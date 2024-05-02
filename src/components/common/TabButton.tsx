import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

type tabProps = {
  title: string;
  func?: () => void;
  width: number;
}

function TabButton({title, func, width}: tabProps): React.JSX.Element {
  return (
    <TouchableOpacity onPress={func}>
      <View style={[styles.titleBox, {width: width/2}]}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TabButton;

const styles = StyleSheet.create({
  titleBox: {
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#030303',
    borderLeftColor: '#292929',
    borderRightColor: '#292929',
  },
  titleText:{
    fontSize: 16,
    color: 'white',
  }
})