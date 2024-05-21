import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import {Routes} from '../../screens/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type RootStackNavigationProp = NativeStackNavigationProp<Routes>;
import { useNavigation } from '@react-navigation/native';
import backIcon from '@assets/icons/backspace_white.png';

type headerProps = {
  title: string;
}
function MenuHeader(props: headerProps) {
  const navigation = useNavigation< RootStackNavigationProp>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconPosition}
        onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.menuTitle}>{props.title}</Text>
    </View>
  );
}

export default MenuHeader;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  icon: {
    width: 8.5,
    height: 20,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
});

