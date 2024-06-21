import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import Preferred from '@components/SettingScreen/Preferred';
import React, {useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '@components/SettingScreen/CommonButton';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
function PreferEdit() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <MenuHeader title="선호 태그 편집" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          onContentSizeChange={() => {
            if(contentLoaded) {
              scrollViewRef.current?.scrollToEnd();
            }else{
              setContentLoaded(true);
            }
          }}
          ref={scrollViewRef}>
          <Preferred />
        </ScrollView>
        <CommonButton title="저장하기" func={()=>navigation.goBack()} paddingNumber={20}/>
      </View>
    </SafeAreaView>
  );
}

export default PreferEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
    height: height,
    marginBottom: 60,
  },
});
