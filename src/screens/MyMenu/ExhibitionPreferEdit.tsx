import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import Preferred from '@components/SettingScreen/Preferred';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '@components/SettingScreen/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { myExhibitionFilterPreferTag } from 'src/apis/mygallery';
import { useQuery } from '@tanstack/react-query';

const height = Dimensions.get('window').height;
function ExhibitionPreferEdit() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [fetch, setFetch] = useState(false);
  const { data: preferred, isLoading, isError } = useQuery({
    queryKey: ['exhibition-tag'],
    queryFn: myExhibitionFilterPreferTag,
  });
  if (isLoading) return <ActivityIndicator size="large" color="#000" />;
  if (isError) {
    // 에러 발생 시 에러 메시지 표시
    return (
      <SafeAreaView edges={['bottom']} style={styles.errorContainer}>
        <Text>데이터를 불러오는 중에 문제가 발생했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <MenuHeader title="전시회 선호 태그 편집" />
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
          <Preferred data={preferred} fetch={fetch} updateFetch={setFetch} label="exhibition"/>
        </ScrollView>
        <CommonButton title="저장하기" func={()=>setFetch(true)} paddingNumber={20}/>
      </View>
    </SafeAreaView>
  );
}

export default ExhibitionPreferEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
    height: height,
    marginBottom: 60,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
