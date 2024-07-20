import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import TopTab from '@components/FilterCreation/TopTab';
import plusIcon from '@assets/icons/cancel.png';
import {useFilterCreationStore} from '@store/filterCreationStore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import CommonModal from '@components/common/CommonModal';
import {useMutation} from '@tanstack/react-query';
import {createFilter} from 'src/apis/filterService';
import {filterServiceToken} from '@utils/dummy';
import {
  CreateFilterParams,
  CreateFilterResponse,
  FilterTagType,
  RequestDto,
  TemporaryFilter,
} from '@types/filterService.type';
import {filterIdToName, filterNameToId, filterTagsData} from '@utils/filter';
import {AxiosError, AxiosResponse} from 'axios';
import cancelIcon from '@assets/icons/cancel_gray.png';

function FilterCreationDescScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const tempFilterRef = useRef(route.params as TemporaryFilter);
  const tempFilter = tempFilterRef.current;

  console.log('tempFilter: ', tempFilter);

  const {top} = useSafeAreaInsets();
  const width = Dimensions.get('window').width - 40;
  const [height, setImageHeight] = useState<number>(0);
  const {
    setSelectedImageUri,
    filteredImageUri,
    setFilteredImageUri,
    additionalImageUri,
    setAdditionalImageUriEmpty,
    filterValue,
    setFilterValueInitial,
  } = useFilterCreationStore();

  const [filterName, setFilterName] = useState<string>(tempFilter?.filter_name);
  const [filterDescription, setFilterDescription] = useState<string>(tempFilter?.description);
  const [filterTags, setFilterTags] = useState<FilterTagType[]>(
    tempFilter?.filter_tag_list.filter_tag_list.map(tag => filterIdToName(tag)) || [],
  );

  const [tempModalVisible, setTempModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const saveMutation = useMutation<CreateFilterResponse, AxiosError, CreateFilterParams>({
    mutationFn: createFilter,
    onSuccess: () => onSaveSuccess(tempModalVisible),
  });

  function onSaveSuccess(temp = false) {
    setAdditionalImageUriEmpty(); // 추가 이미지 초기화
    setFilterValueInitial(); // 필터 값 초기화
    setSelectedImageUri(''); // 선택 이미지 초기화
    setFilteredImageUri(''); // 필터 이미지 초기화

    if (temp) {
      setTempModalVisible(!tempModalVisible);
      navigation.navigate('CameraPage');
      console.log('임시 저장 성공');
    } else {
      setCreateModalVisible(!createModalVisible);
      navigation.navigate('Exhibitions');
      console.log('필터 제작 성공');
    }
  }

  // 필터 제작 - 임시저장일 경우 (url: '/temporary_filter')
  const onPressSave = async (url: '' | '/temporary_filter') => {
    const {gray_scale, ...filter_attribute} = filterValue;

    const thumbnail = {
      uri: filteredImageUri as string,
      name: `thumbnail${Date.now()}.jpg`, // 현재 시간을 이용하여 파일명을 생성합니다.
      type: 'image/jpg',
    };

    const representationImg = additionalImageUri.map((uri, index) => ({
      uri,
      name: `representation${index}${Date.now()}.jpg`, // 현재 시간을 이용하여 파일명을 생성합니다.
      type: 'image/jpg',
    }));

    const requestDto: RequestDto = {
      filter_attribute,
      gray_scale: gray_scale as number,
      filter_information: {
        name: filterName,
        description: filterDescription,
        tag_list: {tags: filterTags.map(tag => filterNameToId(tag))},
      },
      tmp_filter_id: '', // 추후 수정
    };

    try {
      await saveMutation.mutate({
        url,
        token: filterServiceToken,
        thumbnail,
        representationImg,
        requestDto,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressAddTag = (tag: FilterTagType) => {
    if (!filterTags.includes(tag)) {
      setFilterTags([...filterTags, tag]);
    }
  };

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
            <TextInput
              style={styles.text}
              placeholder="필터명을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              value={filterName}
              onChangeText={setFilterName}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.text}
              placeholder="필터 설명을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              value={filterDescription}
              onChangeText={setFilterDescription}
            />
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
            data={filterTagsData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onPressAddTag(item.name)}
                style={[
                  styles.keyword,
                  {
                    marginLeft: index === 0 ? 20 : 0,
                    marginRight: index === filterTagsData.length - 1 ? 20 : 0,
                  },
                ]}>
                <Text style={styles.keywordText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* 선택한 태그가 없을 경우, 빈 화면을 표시합니다. */}
        {filterTags?.length > 0 && (
          <>
            <View style={{paddingHorizontal: 20, paddingTop: 15}}>
              <Text style={{color: '#FFF', fontSize: 13, fontWeight: '500'}}>내가 선택한 태그</Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10}}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{gap: 10}}
                data={filterTags}
                renderItem={({item, index}) => (
                  <View
                    key={item}
                    style={[
                      styles.selectedKeyword,
                      {
                        marginLeft: index === 0 ? 20 : 0,
                        marginRight: index === filterTags.length - 1 ? 20 : 0,
                      },
                    ]}>
                    <Text style={styles.selectedKeywordText}>{item}</Text>
                    <Pressable onPress={() => setFilterTags(filterTags.filter(tag => tag !== item))}>
                      <Image source={cancelIcon} style={{width: 17, height: 17}} resizeMode="contain" />
                    </Pressable>
                  </View>
                )}
              />
            </View>
          </>
        )}
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
        onConfirm={() => onPressSave('/temporary_filter')}
        onClose={() => setTempModalVisible(!tempModalVisible)}
      />

      <CommonModal
        title="필터 제작을 완료하시겠습니까?"
        subTitle={`필터 제작을 완료하면 필터 대표사진과 필터명은
        더 이상 변경이 불가능합니다.

        제작 완료는 신중하게 해주세요!`}
        button={['확인', '닫기']}
        visible={createModalVisible}
        onConfirm={() => onPressSave('')}
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
    margin: 0,
    padding: 0,
  },
  keyword: {
    // height: 42,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: '#414141',
  },
  keywordText: {
    color: '#F4F4F4',
    fontSize: 16,
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
    marginBottom: 20,
  },
  saveText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
