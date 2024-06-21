import React, {useState} from 'react';
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
import {useExhibitionCreationStore, useExhibitionDetailsStore} from '../../store/exhibitionCreationStore';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import CommonModal from '@components/common/CommonModal';
import {finalizeExhibition} from '../../apis/exhibitionCreate';
import Config from 'react-native-config';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ExhibitionFilterApplyCompleteScreen = () => {
  const apiToken = Config.API_TOKEN;

  const navigation = useNavigation();
  const {details, setDetails} = useExhibitionDetailsStore(); // 스토어 사용
  //선택한 이미지
  const {selectedImageUri, additionalImageUri} = useExhibitionCreationStore();
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

  const finalizeCreation = async () => {
    if (!allFieldsFilled) {
      console.log('details', details);
      Alert.alert('모든 정보를 입력해야 제작을 진행할 수 있습니다.');
      return;
    }

    // filter_photo_list 구성
    const filterPhotos = additionalImageUri.map(image => ({
      gray_scale: image.filterDetails?.grayScale,
      filter_id: image.filterDetails?.id,
    }));
    console.log('filterPhotos', filterPhotos);
    // exhibitionData 구성
    const exhibitionData = {
      filter_photo_list: {filter_photos: filterPhotos},
      exhibition_information: {
        title: details.title,
        description: details.description,
        tag_list: {
          tag_list: details.mood,
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

    try {
      const token = apiToken;
      console.log(exhibitionData);
      await finalizeExhibition({token, exhibitionData});
      Alert.alert('전시가 성공적으로 제작되었습니다.');
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('전시 제작 중 오류가 발생했습니다.');
    }
  };

  const moodOptions = ['초상화', '풍경', '거리', '음식', '여행', '패션'];

  const toggleMood = (selectedMood: string) => {
    let newMood = details.mood.includes(selectedMood)
      ? details.mood.filter(m => m !== selectedMood)
      : [...details.mood, selectedMood];
    setDetails({mood: newMood});
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
                <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />
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
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder="필터 설명을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              onChangeText={text => setDetails({description: text})}
              value={details.description}
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
                <TouchableOpacity
                  onPress={() => toggleMood(item)}
                  style={[
                    styles.keyword,
                    {
                      borderColor: details.mood.includes(item) ? '#FFD600' : '#414141', // 조건에 따라 보더 컬러 설정
                      borderWidth: 1, // 보더가 보이도록 폭 설정
                    },
                  ]}>
                  <Text style={styles.keywordText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

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
            finalizeCreation(); // 최종 전시 제작 실행
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
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 11,
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
});

export default ExhibitionFilterApplyCompleteScreen;
