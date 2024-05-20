import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import Certificate from '@components/SettingScreen/GoOutScreen/Certificate';
import CommonButton from '@components/SettingScreen/CommonButton';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useState, useRef } from 'react';
type Props = NativeStackScreenProps<Routes, 'Certification'>;

const windowHeight = Dimensions.get('window').height;
function Certification({navigation, route}: Props) {
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <MenuHeader title="회원 탈퇴" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          onContentSizeChange={()=>{
            if(contentLoaded){
              scrollViewRef.current?.scrollToEnd();
            }else{
              setContentLoaded(true);
            }
          }}
          ref={scrollViewRef}>
          <Certificate />
        </ScrollView>
        <CommonButton marginHorizontal={20} margin={0} title="탈퇴하기" />
      </View>
    </SafeAreaView>
  );
}

export default Certification;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    height: windowHeight,
    backgroundColor: '#030303',
    marginBottom: 100,
    flexGrow: 1,
    paddingBottom: 60,
  },
});
