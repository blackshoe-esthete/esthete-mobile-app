import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions, Text, Keyboard, ActivityIndicator} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import Keyword from '@components/FilterSearchScreen/KeywordList';
import cancel from '@assets/icons/cancel_black.png';
import FilterTitle from '@components/FilterSearchScreen/FilterTitle';
import UsedPicture from '@components/FilterSearchScreen/FilterUsedPicture';
import {ScrollView, TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import TabButton from '@components/common/TabButton';
import CommonModal from '@components/common/CommonModal';
import {useQuery} from '@tanstack/react-query';
import {indexFilterDetail} from 'src/apis/filterService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {filterTagsData} from '@utils/filter';

type Props = NativeStackScreenProps<Routes, 'FilterIndexScreen'>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageWidth = windowWidth * 0.95;
const maxHeight = windowHeight * 0.5;

function FilterIndexScreen({navigation, route}: Props): React.JSX.Element {
  const [height, setHeight] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterIndex, setFilterIndex] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [imgList, setImgList] = useState<string[]>([]);
  useEffect(() => {
    if (route.params?.filterId) {
      let id: string = route.params?.filterId;
      setFilterIndex(id);
    }
  }, [route.params]);

  const {
    data: filterIndexData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['filter-single', filterIndex],
    queryFn: () => indexFilterDetail(filterIndex),
  });

  useEffect(() => {
    if (filterIndexData?.filter_thumbnail) {
      Image.getSize(
        filterIndexData.filter_thumbnail,
        (originalWidth, originalHeight) => {
          const aspectRatio = originalWidth / originalHeight;
          setHeight(imageWidth / aspectRatio);
        },
        error => {
          console.error('Error getting image size:', error);
        },
      );
    }
  }, [filterIndexData?.filter_thumbnail]);

  useEffect(() => {
    if (filterIndexData?.filter_tag_list.filter_tag_list) {
      let tags: string[] = [];
      filterIndexData?.filter_tag_list?.filter_tag_list.forEach((item: string) => {
        filterTagsData.forEach(object => {
          if (object.id == item) {
            tags.push(object.name);
          }
        });
      });
      setTagList(tags);
    }
  }, [filterIndexData?.filter_tag_list]);

  useEffect(() => {
    if(filterIndexData?.representation_img_list.representation_img_list){
      let imgs: string[] = [];
      filterIndexData.representation_img_list.representation_img_list.forEach((imgUrl: string) => {
        imgs.push(imgUrl);
      });
      setImgList(imgs);
    }
  }, [filterIndexData?.representation_img_list]);

  const modalShown = () => {
    setModalVisible(!modalVisible);
  };
  // HTML 태그를 포함하는 문자열
  const subTitleText = `
  어려운 이미지 보정, 필터 구매를 통해 클릭 한 번으로 완료!

  다양한 사용자의 개성이 담긴 필터를 이용하여 
  나만의 전시회를 꾸며보세요.
`;

  const customProps = {
    title: '필터를 구매하시겠습니까?',
    subTitle: subTitleText,
    visible: modalVisible,
    onClose: modalShown,
    button: ['구매하기', '닫기'],
  };

  if (isLoading) {
    // 데이터 로딩 중일 때 로딩 인디케이터 표시
    return (
      <SafeAreaView edges={['bottom']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (isError) {
    // 에러 발생 시 에러 메시지 표시
    return (
      <SafeAreaView edges={['bottom']} style={styles.errorContainer}>
        <Text>데이터를 불러오는 중에 문제가 발생했습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.topArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cancel} style={styles.iconSize} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginBottom: 70}}>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <Image
            source={{uri: filterIndexData.filter_thumbnail}}
            style={[styles.imageSize, {width: imageWidth, height: height, maxHeight: maxHeight}]}
          />

          {/* 필터타이틀 */}
          <View style={{width: '100%'}}>
            <FilterTitle
              title={filterIndexData?.filter_name}
              likeCount={filterIndexData?.like_count}
              isLike={filterIndexData?.is_like}
              filterId={filterIndex}
            />
          </View>

          {/* 키워드리스트 */}
          <Keyword marginProp={20} marginVertical={20} dummy={tagList} />

          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              {filterIndexData?.filter_description ? (
                <Text style={styles.detailText}>{filterIndexData.filter_description}</Text>
              ) : (
                <Text>{filterIndexData.user_id} 의 다른 필터도 둘러보세요!</Text>
              )}
            </Text>
          </View>

          {/* 필터를 이용한 사진 */}
          <View style={{width: '100%', marginTop: 30}}>
            <Text style={styles.photoTitle}>필터를 이용한 사진</Text>
            <UsedPicture
              title="필터를 이용한 사진"
              data={imgList}
              imgStyles={styles.exhibitionImg}
            />
          </View>
        </View>
      </ScrollView>

      {/* 탭바 커스텀 */}
      <View style={styles.bottomTab}>
        <TabButton title="미리보기" width={windowWidth} />
        <TabButton title="구매하기" width={windowWidth} func={modalShown} />
        <CommonModal {...customProps} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  topArea: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingRight: 16,
  },
  iconSize: {
    width: 25,
    height: 25,
  },
  imageSize: {
    marginTop: 20,
    resizeMode: 'contain',
  },
  detailBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#292929',
    width: '100%',
    height: 'auto',
    minHeight: 60,
  },
  detailText: {
    color: 'white',
  },
  photoTitle: {
    color: 'white',
    fontSize: 15,
  },
  exhibitionImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  bottomTab: {
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#030303',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterIndexScreen;
