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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import CommonModal from '@components/common/CommonModal';

const mood = ['따뜻한', '부드러운', '평화로운', '차가운', '빈티지한', '몽환적인', '싱그러운'];

interface FilterCreationDescScreenProps {
  // Define the props for the component here
}

function FilterCreationDescScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {top} = useSafeAreaInsets();
  const width = Dimensions.get('window').width - 40;
  const [height, setImageHeight] = useState<number>(0);
  const {filteredImageUri, additionalImageUri, setAdditionalImageUriEmpty} = useFilterCreationStore();

  const [tempModalVisible, setTempModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const onPressBack = () => {
    setAdditionalImageUriEmpty();
    navigation.goBack();
  };

  const onPressNext = () => {
    setTempModalVisible(!tempModalVisible);
  };

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
        <TopTab text={'임시 저장'} to={'CameraPage'} onPressBack={onPressBack} onPressNext={onPressNext} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', maxHeight: Dimensions.get('window').height * 0.7}}>
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
            {[0, 1, 2].map(index => (
              <Pressable
                key={index}
                style={styles.imgBox}
                onPress={() => navigation.navigate('FilterCreationGallery', {type: 'sub', index})}>
                {additionalImageUri[index] ? (
                  <Image
                    source={{uri: additionalImageUri[index]}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                ) : (
                  <Image source={plusIcon} style={styles.plusIcon} resizeMode="contain" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.save} onPress={() => setCreateModalVisible(!createModalVisible)}>
          <Text style={styles.saveText}>제작하기</Text>
        </Pressable>
      </ScrollView>

      <CommonModal
        title="필터 제작을 임시저장하시겠습니까?"
        subTitle={`임시저장된 필터는 마이갤러리에서 확인 가능합니다.
        나중에 다시 수정해주세요!`}
        button={['확인', '닫기']}
        visible={tempModalVisible}
        onConfirm={() => {
          setTempModalVisible(!tempModalVisible);
          navigation.navigate('CameraPage');
        }}
        onClose={() => setTempModalVisible(!tempModalVisible)}
      />
      <CommonModal
        title="필터 제작을 완료하시겠습니까?"
        subTitle={`필터 제작을 완료하면 필터 대표사진과 필터명은
        더 이상 변경이 불가능합니다.

        제작 완료는 신중하게 해주세요!`}
        button={['확인', '닫기']}
        visible={createModalVisible}
        onConfirm={() => {
          setCreateModalVisible(!createModalVisible);
          navigation.navigate('Main');
        }}
        onClose={() => setCreateModalVisible(!createModalVisible)}
      />
    </SafeAreaView>
  );
}

export default FilterCreationDescScreen;

const styles = StyleSheet.create({
  topInset: {
    backgroundColor: '#030303',
  },
  image: {
    maxHeight: Dimensions.get('window').height * 0.7,
  },
  textInput: {
    paddingVertical: 17,
    paddingHorizontal: 20,
    backgroundColor: '#292929',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFF',
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
