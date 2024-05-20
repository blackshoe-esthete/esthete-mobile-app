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
import GoOutModal from '@components/SettingScreen/GoOutScreen/GoOutModal';
type Props = NativeStackScreenProps<Routes, 'Certification'>;

const windowHeight = Dimensions.get('window').height;
function Certification({navigation, route}: Props) {
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const modalShown = () => {
    setModalVisible(!modalVisible);
  };

  const subTitleText = `
  탈퇴시 계정과 관련된 모든 정보가 사라집니다.
  그래도 탈퇴하시겠습니까?`
  const customProps = {
    title: '정말 탈퇴하시겠습니까?',
    subTitle: subTitleText,
    visible: modalVisible,
    onClose: modalShown,
    button: ['탈퇴하기', '취소']
  }
  
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
        <CommonButton func={modalShown} title="탈퇴하기" />
        
        {/* 모달관리 */}
        <GoOutModal {...customProps}/>
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
