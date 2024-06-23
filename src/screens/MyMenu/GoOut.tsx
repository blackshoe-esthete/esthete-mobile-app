import GoOutList from '@components/SettingScreen/GoOutScreen/GoOutList';
import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import CommonButton from '@components/SettingScreen/CommonButton';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {useRef, useState} from 'react';
type Props = NativeStackScreenProps<Routes, 'GoOut'>;

const windowHeight = Dimensions.get('window').height;
function GoOut({navigation, route}: Props) {
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <MenuHeader title="회원 탈퇴" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          onContentSizeChange={() => {
            if(contentLoaded){
              scrollViewRef.current?.scrollToEnd();
            }else{
              setContentLoaded(true);
            }
          }}
          ref={scrollViewRef}>
          <GoOutList />
        </ScrollView>
        <CommonButton title="다음" navigation={navigation} paddingNumber={20}/>
      </View>
    </SafeAreaView>
  );
}

export default GoOut;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
    marginBottom: 130,
    paddingBottom: 60,
    height: windowHeight,
  },
});
