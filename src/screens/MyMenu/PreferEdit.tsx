import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import Preferred from '@components/SettingScreen/Preferred';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function PreferEdit() {
  return (
    <SafeAreaView edges={['top']}>
      <MenuHeader title="선호 태그 편집" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <Preferred />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PreferEdit;

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    backgroundColor: '#030303',
  },
});
