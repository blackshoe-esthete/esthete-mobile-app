import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  useExhibitionCreationStore,
  useExhibitionDetailsStore,
  useFilterDetailsStore,
} from '../../store/exhibitionCreationStore';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import CommonModal from '@components/common/CommonModal';
import {finalizeExhibition, saveOrUpdateExhibition} from '../../apis/exhibitionCreate';
import Config from 'react-native-config';
import cancleIcon from '@assets/icons/cancel_gray.png';
import {
  Sharpen,
  ColorMatrix,
  concatColorMatrices,
  hueRotate,
  saturate,
  brightness,
  contrast,
  temperature,
  grayscale,
} from 'react-native-image-filter-kit';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExhibitionFilterApplyCompleteScreen = () => {
  const apiToken = Config.API_TOKEN;

  const navigation = useNavigation();
  const {details, setDetails, resetDetails} = useExhibitionDetailsStore(); // 스토어 사용
  //선택한 이미지
  const {selectedImageUri, additionalImageUri, resetImages} = useExhibitionCreationStore();
  const {currentFilterAttributes} = useFilterDetailsStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  //모달
  const [tempModalVisible, setTempModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  //전시 설명

  const allFieldsFilled =
    selectedImageUri &&
    additionalImageUri.length > 0 &&
    details.title &&
    details.description &&
    details.mood.length > 0 &&
    details.location;

  const finalizeCreation = async (type: string) => {
    if (type == 'create' && !allFieldsFilled) {
      console.log('details', details);
      Alert.alert('모든 정보를 입력해야 제작을 진행할 수 있습니다.');
      return;
    }

    // filter_photo_list 구성
    const filterPhotos = additionalImageUri.map(image => ({
      gray_scale: image.filterDetails?.grayScale,
      filter_id: image.filterDetails?.id,
    }));

    const exhibition_photo = additionalImageUri.map((uri, index) => ({
      uri: uri.uri,
      name: `representation${index}${Date.now()}.jpg`, // 현재 시간을 이용하여 파일명을 생성합니다.
      type: 'image/jpg',
    }));

    // exhibitionData 구성
    const exhibitionData = {
      filter_photo_list: {filter_photos: filterPhotos},
      exhibition_information: {
        title: details.title,
        description: details.description,
        tag_list: {
          tags: details.mood,
        },
      },
      exhibition_location: {
        longitude: details.location.longitude,
        latitude: details.location.latitude,
        state: details.location.format_address,
        city: '',
        town: '',
      },
      tmp_exhibition_id: details.tmpExhibitionId || '',
    };

    const formData = new FormData();

    exhibition_photo.forEach(img => {
      formData.append(`exhibition_photo`, {
        uri: img.uri,
        name: img.name,
        type: img.type,
      });
    });

    formData.append('requestDto', JSON.stringify(exhibitionData));

    function logFormData(formData: FormData) {
      const entries = formData as unknown as {_parts: [string, any][]};

      entries._parts.forEach(([key, value]) => {
        console.log('key', key);
        console.log('value', value);
      });
    }
    logFormData(formData);

    try {
      const token = apiToken;

      if (type === 'save') {
        await saveOrUpdateExhibition({token, formData});
        Alert.alert('전시 임시저장 완료!');
      } else {
        await finalizeExhibition({token, formData});
        Alert.alert('전시 업로드 완료!');
      }

      resetDetails();
      resetImages();

      navigation.navigate('Exhibitions');
    } catch (error) {
      Alert.alert('전시 제작 중 오류가 발생했습니다.');
    }
  };

  const moodOptions = [
    {id: 'fe96c294-b5f3-425e-a6de-8cc1b13beb5a', name: '부드러운'},
    {id: '118ccbfb-8caf-498b-913a-16a315b3a859', name: '초상화'},
    {id: '4a0db2eb-f4bc-4fa3-ae47-8381ed0da1ab', name: '풍경'},
    {id: 'ae4a3cee-f7e3-48a1-8b0a-eb4d177b2267', name: '거리'},
    {id: '1f479a8d-dab2-4d95-96c9-73d5f7382a01', name: '음식'},
    {id: '8969e7f1-2d1e-4a6d-b234-73c2aa7b24ff', name: '여행'},
    {id: '9b11a16b-6786-4a28-8273-ff9e06b80318', name: '패션'},
  ];

  const toggleMood = (selectedMoodId: string) => {
    let newMood = details.mood.includes(selectedMoodId)
      ? details.mood.filter(m => m !== selectedMoodId)
      : [...details.mood, selectedMoodId];
    setDetails({mood: newMood});
    console.log('newMood', newMood);
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {/* 상단 탭 */}
        <View style={styles.topTab}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#FFF'}}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTempModalVisible(true);
            }}>
            <Text style={{color: '#FFF'}}>임시저장</Text>
          </TouchableOpacity>
        </View>

        {/* 이미지 Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={SCREEN_WIDTH - 40}
            height={(SCREEN_WIDTH - 40) * 0.9}
            data={
              additionalImageUri.length > 0
                ? additionalImageUri.map(image => image.uri)
                : [selectedImageUri].filter(Boolean)
            }
            scrollAnimationDuration={1000}
            onSnapToItem={index => setCurrentImageIndex(index)}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Sharpen
                  image={
                    <ColorMatrix
                      matrix={concatColorMatrices([
                        brightness(currentFilterAttributes?.brightness),
                        contrast(currentFilterAttributes?.contrast),
                        saturate(currentFilterAttributes?.saturation),
                        hueRotate(currentFilterAttributes?.hue),
                        temperature(currentFilterAttributes?.temperature),
                        grayscale(currentFilterAttributes?.grayScale),
                      ])}
                      image={<Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />}
                    />
                  }
                  amount={currentFilterAttributes?.sharpness}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* 전시 세부 */}
        <View style={{gap: 20, marginTop: 80, paddingHorizontal: 20}}>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder="전시 제목을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              onChangeText={text => setDetails({title: text})}
              value={details.title}
              autoCorrect={false} // 자동 수정 제안 끄기
              spellCheck={false} // 철자 검사 끄기
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder="필터 설명을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              onChangeText={text => setDetails({description: text})}
              value={details.description}
              autoCorrect={false} // 자동 수정 제안 끄기
              spellCheck={false} // 철자 검사 끄기
            />
          </View>
        </View>

        {/* 느낌 선택 */}
        <View style={{gap: 10, marginTop: 30}}>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: '#FFF', fontSize: 14, marginBottom: 20}}>어떤 느낌의 전시인가요?</Text>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}
              data={moodOptions}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => toggleMood(item.id)} style={[styles.keyword]}>
                  <Text style={styles.keywordText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* 선택한 태그 표시 */}
        {details.mood.length > 0 && (
          <View style={{paddingHorizontal: 20, paddingTop: 15}}>
            <Text style={{color: '#FFF', fontSize: 13, fontWeight: '500'}}>내가 선택한 태그</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10}}>
              {details.mood.map((mood, index) => (
                <View key={index} style={styles.selectedKeyword}>
                  <Text style={styles.selectedKeywordText}>{moodOptions.find(option => option.id === mood)?.name}</Text>
                  <Pressable onPress={() => setDetails({mood: details.mood.filter(m => m !== mood)})}>
                    <Image source={cancleIcon} style={{width: 17, height: 17}} resizeMode="contain" />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{gap: 20, marginTop: 25, paddingHorizontal: 20}}>
          <Text style={{color: '#FFF', fontSize: 14}}>전시 위치</Text>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() => {
              navigation.navigate('PlacesSearch');
            }}>
            <Text style={styles.text}>{details.location ? `${details.location.format_address}` : '위치 추가하기'}</Text>
          </TouchableOpacity>
        </View>

        <Pressable
          style={[styles.save, {backgroundColor: allFieldsFilled ? '#FFD600' : '#B8B8B8'}]}
          onPress={() => {
            if (!allFieldsFilled) {
              Alert.alert('모든 정보를 입력해야 제작을 진행할 수 있습니다.');
              return;
            } else {
              setCreateModalVisible(true);
            }
          }}>
          <Text style={styles.saveText}>제작하기</Text>
        </Pressable>

        {/* Common Modals */}
        <CommonModal
          title="전시 제작을 임시저장하시겠습니까?"
          subTitle={`임시저장된 전시는 마이갤러리에서 확인 가능합니다.\n나중에 다시 수정해주세요!`}
          button={['확인', '닫기']}
          visible={tempModalVisible}
          onConfirm={() => {
            setTempModalVisible(!tempModalVisible);
            navigation.navigate('Main');
            finalizeCreation('save'); //임시저장 실행
          }}
          onClose={() => setTempModalVisible(!tempModalVisible)}
        />
        <CommonModal
          title="전시 제작을 완료하시겠습니까?"
          subTitle={`전시 제작을 완료하면 전시 대표사진과 전시명을 변경하거나\n전시에 등록한 사진을 삭제하는 것은 불가능합니다.\n\n제작 완료는 신중하게 해주세요!`}
          button={['확인', '닫기']}
          visible={createModalVisible}
          onConfirm={() => {
            setCreateModalVisible(!createModalVisible);
            finalizeCreation('create'); // 최종 전시 제작 실행
          }}
          onClose={() => setCreateModalVisible(!createModalVisible)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topTab: {
    flexDirection: 'row',
    marginTop: 60,
    paddingVertical: 13,
    paddingRight: 19,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#414141',
  },
  keywordText: {
    color: '#F4F4F4',
    fontSize: 16,
  },
  carouselContainer: {
    width: SCREEN_WIDTH - 40,
    height: (SCREEN_WIDTH - 40) * 0.75,
    marginHorizontal: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  save: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
  },
  saveText: {
    fontSize: 18,
    fontWeight: '700',
  },
  selectedKeyword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8.5,
    paddingLeft: 13,
    paddingRight: 10,
    paddingVertical: 10,
    backgroundColor: '#414141',
  },
  selectedKeywordText: {
    color: '#F4F4F4',
    fontSize: 14,
  },
});

export default ExhibitionFilterApplyCompleteScreen;
