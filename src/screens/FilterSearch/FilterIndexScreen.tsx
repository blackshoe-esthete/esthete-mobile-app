import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  // TouchableOpacity,
  Dimensions,
  Text,
  Keyboard,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import Keyword from '@components/FilterSearchScreen/KeywordList';
import cancel from '@assets/icons/cancel_black.png';
import ex1 from '@assets/imgs/filter_ex3.png';
import ex2 from '@assets/imgs/filter_ex2.png';
import FilterTitle from '@components/FilterSearchScreen/FilterTitle';
import UsedPicture from '@components/FilterSearchScreen/FilterUsedPicture';
import {ScrollView, TouchableOpacity, GestureHandlerRootView} from 'react-native-gesture-handler';
import TabButton from '@components/common/TabButton';
import CommonModal from '@components/common/CommonModal';

type Props = NativeStackScreenProps<Routes, 'FilterIndexScreen'>;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageWidth = windowWidth * 0.95;
const maxHeight = windowHeight * 0.5;

function FilterIndexScreen({navigation, route}: Props): React.JSX.Element {
  const [height, setHeight] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // 로컬 이미지인 경우 Image.resolveAssetSource를 사용
    const resolvedSource = Image.resolveAssetSource(ex1);
    const ratio = resolvedSource.height / resolvedSource.width;
    setHeight(imageWidth * ratio);
  }, [ex1, imageWidth]);

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.topArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cancel} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20, alignItems: 'center'}}>
          <Image source={ex1} style={[styles.imageSize, {width: imageWidth, height: height, maxHeight: maxHeight}]} />

          {/* 필터타이틀 */}
          <View style={{width: '100%'}}>
            <FilterTitle />
          </View>

          {/* 키워드리스트 */}
          <Keyword marginProp={20} marginVertical={20} dummy={['풍경', '여행']} />

          <View style={styles.detailBox}>
            <Text style={styles.detailText}>
              여기에는 필터에 대한 설명(필터를 만들게 된 스토리, 필터 사용 팁 등) 및 필터를 사용하여 촬영한 사진에 대한
              설명이 들어갑니다.
            </Text>
          </View>

          {/* 필터를 이용한 사진 */}
          <View style={{width: '100%', marginTop: 30}}>
            <Text style={styles.photoTitle}>필터를 이용한 사진</Text>
            <UsedPicture
              title="필터를 이용한 사진"
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              imgStyles={styles.exhibitionImg}
              imgSource={ex2}
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
  imageSize: {
    marginTop: 20,
    resizeMode: 'contain',
  },
  detailBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#292929',
    height: 'auto',
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
});

export default FilterIndexScreen;
