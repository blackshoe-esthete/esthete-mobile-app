import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import TopTab from '@components/FilterCreation/TopTab';
import plusIcon from '@assets/icons/cancel.png';
import {useFilterCreationStore} from '@store/filterCreationStore';

const mood = ['따뜻한', '부드러운', '평화로운', '차가운', '빈티지한', '몽환적인', '싱그러운'];

interface FilterCreationDescScreenProps {
  // Define the props for the component here
}

function FilterCreationDescScreen(): React.JSX.Element {
  const {top} = useSafeAreaInsets();
  const width = Dimensions.get('window').width - 40;
  const [height, setImageHeight] = useState(0);
  const {filteredImageUri} = useFilterCreationStore();

  useEffect(() => {
    if (filteredImageUri) {
      Image.getSize(filteredImageUri, (originalWidth, originalHeight) => {
        // 원본 이미지의 비율에 맞춰 높이를 계산합니다.
        const calculatedHeight = originalHeight * (width / originalWidth);
        setImageHeight(calculatedHeight);
      });
    }
  }, [filteredImageUri, width]);

  return (
    <SafeAreaView edges={['bottom']} style={StyleSheet.absoluteFill}>
      <View style={[styles.topInset, {paddingTop: top}]} />
      <View style={{paddingHorizontal: 20}}>
        <TopTab text={'임시 저장'} to={'FilterCreation'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: filteredImageUri}}
            style={[
              styles.image,
              {
                width: width,
                height: height,
              },
            ]}
            resizeMode="contain"
          />
        </View>
        <View style={{gap: 20, marginVertical: 30, paddingHorizontal: 20}}>
          <View style={styles.textInput}>
            <TextInput style={styles.text} placeholder="필터명을 작성해주세요" placeholderTextColor="#D6D6D6" />
          </View>
          <View style={styles.textInput}>
            <TextInput style={styles.text} placeholder="필터 설명을 작성해주세요" placeholderTextColor="#D6D6D6" />
          </View>
        </View>
        <View style={{gap: 10}}>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: '#FFF', fontSize: 14}}>어떤 느낌의 필터인가요?</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 10}}
            data={mood}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.keyword,
                  {
                    marginLeft: index === 0 ? 20 : 0,
                    marginRight: index === mood.length - 1 ? 20 : 0,
                  },
                ]}>
                <Text style={styles.keywordText}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View style={{gap: 10, marginVertical: 30, paddingHorizontal: 20}}>
          <Text style={{color: '#FFF', fontSize: 14}}>필터를 사용할 사진을 선택해주세요!</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Pressable style={styles.imgBox}>
              <Image source={plusIcon} style={styles.plusIcon} resizeMode="contain" />
            </Pressable>
            <Pressable style={styles.imgBox}>
              <Image source={plusIcon} style={styles.plusIcon} resizeMode="contain" />
            </Pressable>
            <Pressable style={styles.imgBox}>
              <Image source={plusIcon} style={styles.plusIcon} resizeMode="contain" />
            </Pressable>
          </View>
        </View>
        <View style={styles.save}>
          <Text style={styles.saveText}>제작하기</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FilterCreationDescScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  image: {
    // maxHeight: Dimensions.get('window').width,
  },
  textInput: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: '#292929',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  keyword: {
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#414141',
  },
  keywordText: {
    color: '#F4F4F4',
    fontSize: 16,
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#292929',
  },
  plusIcon: {
    width: 25,
    height: 25,
    transform: [{rotate: '45deg'}],
  },
  save: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  saveText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
