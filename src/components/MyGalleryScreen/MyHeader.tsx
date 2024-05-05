import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import menu from '@assets/icons/menu.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../../screens/Routes';
import Profile from "@components/MyGalleryScreen/Profile";

type Props = NativeStackScreenProps<Routes, 'MyGalleryScreen'>;
function MyHeader(): React.JSX.Element{
  // console.log("맞는데")
  const {top} = useSafeAreaInsets();
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.textFont}>작가명</Text>
        <Image source={menu} style={styles.menuIcon}/>
      </View>
      <Profile />
    </SafeAreaView>
  );
}

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#030303',    
    paddingHorizontal: 20
  },
  root: {
    height: 60,
    width: '100%',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    width: 30,
    height: 20
  },
  textFont: {
    color: 'white',
    fontSize: 20
  }
})