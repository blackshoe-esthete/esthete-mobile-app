import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function ProfileEdit(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="프로필 편집"/>
    </SafeAreaView>
  );
}

export default ProfileEdit;