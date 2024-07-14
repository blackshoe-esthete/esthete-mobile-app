import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import Profile from '@components/SettingScreen/Profile';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonButton from '@components/SettingScreen/CommonButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {useFocusEffect} from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { putMyProfile } from 'src/apis/userInfo';

const windowHeight = Dimensions.get('window').height;
type Props = NativeStackScreenProps<Routes, 'ProfileEdit'>;
function ProfileEdit({navigation, route}: Props) {
  const scrollViewRef = useRef<any>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [image, setImage] = useState<string>('');
  useFocusEffect(
    useCallback(() => {
      if (route.params?.imageUri) {
        setImage(route.params.imageUri);
      }
    }, [route.params?.imageUri]),
  );
  const mutationProfileImg = useMutation({
    mutationFn: () => putMyProfile(image),
    onSuccess(data) {
      console.log(data);
      navigation.goBack();
    },
    onError(err) {
      console.log(err);
    },
  });
  const submitUserInfo = () => {
    mutationProfileImg.mutate();
  }

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <MenuHeader title="프로필 편집" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          onContentSizeChange={() => {
            if (contentLoaded) {
              scrollViewRef.current?.scrollToEnd();
            } else {
              setContentLoaded(true);
            }
          }}
          ref={scrollViewRef}>
          <Profile navigation={navigation} route={route} image={image} />
        </ScrollView>
        <CommonButton title="저장하기" func={submitUserInfo} paddingNumber={20} />
      </View>
    </SafeAreaView>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
    marginBottom: 100,
    height: windowHeight,
    paddingBottom: 60,
  },
});
