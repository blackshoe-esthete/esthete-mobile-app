import {CameraRoll, PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import hasAndroidPermission from '@hooks/CaeraRollPermission';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {useFilterCreationStore} from '@store/filterCreationStore';

import backspaceIcon from '@assets/icons/backspace_white.png';
import cancelIcon from '@assets/icons/cancel_black.png';
import arrowIcon from '@assets/icons/arrow.png';
import checkIcon from '@assets/icons/check.png';
import {RootStackParamList} from '@types/navigations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface GalleryItem extends PhotoIdentifier {
  thumbnailUri?: string; // 추가
}

// `GalleryScreenProps`를 `RootStackParamList`의 'FilterCreationGallery' 타입을 사용하여 정의합니다.
type GalleryScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterCreationGallery'>;

function GalleryScreen({route}: GalleryScreenProps): React.JSX.Element {
  const {type, index} = route.params;

  const navigation = useNavigation();
  //스크롤 될 때마다 사진을 불러올 경우 현재의 갤러리를 어디까지 불러왔는지에 대한 저장 값
  const [galleryCursor, setGalleryCursor] = useState<string | undefined>();
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  const {
    selectedImageUri,
    setSelectedImageUri,
    filteredImageUri,
    setFilteredImageUri,
    additionalImageUri,
    setAdditionalImageUri,
  } = useFilterCreationStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const selectImage = async (item: GalleryItem, index: number) => {
    if (Platform.OS === 'ios') {
      const originalUri = await phPathToFilePath(item.node.image.uri, item.node.image.width, item.node.image.height);
      setImageUri(originalUri);
    } else {
      setImageUri(item.node.image.uri);
    }
    setSelectedImageIndex(index);
  };

  const setImageUri = async (uri: string) => {
    switch (type) {
      case 'main':
        setSelectedImageUri(uri);
        // if (!filteredImageUri)
        // setFilteredImageUri(uri);
        break;
      case 'sub':
        setAdditionalImageUri(uri, index as number);
        break;
    }
  };

  const getGalleryPhotos = async () => {
    const params = {
      //이미지를 불러올 개수 (최신순으로)
      first: 16,
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      //사진을 불러옵니다. edges는 gallery photo에 대한 정보
      const {edges, page_info} = await CameraRoll.getPhotos(params);

      if (page_info.has_next_page) {
        setGalleryCursor(page_info.end_cursor);
      } else {
        setGalleryCursor(undefined);
      }

      // ios인 경우는 ph:// 형식으로 사진이 저장됩니다.
      // 이미지를 읽을 수 없는 오류가 생기기 때문에
      // react-native-fs의 파일 시스템을 이용하여 변환 시켜줍니다.
      const newGalleryList = [...galleryList];

      if (Platform.OS === 'ios') {
        for await (const item of edges) {
          const thumbnailUri = await phPathToFilePath(item.node.image.uri, 300, 300);
          newGalleryList.push({...item, thumbnailUri});
        }
      }

      setGalleryList(newGalleryList);
    } catch (error) {
      console.log('[takeStore getPhotos error occured] ', error);
    }
  };

  const phPathToFilePath = async (uri: string, width: number, height: number) => {
    let fileURI = encodeURI(uri); // 이걸 하는 이유는 한글이 들어가면 오류가 발생하기 때문입니다.

    // ph://로 시작하는 uri인 경우에만 처리합니다. ios만 해당됩니다.
    if (uri.startsWith('ph://')) {
      // replace를 통해 :를 -로 변경해줍니다. g는 전체를 의미합니다.
      const copyPath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

      // copyAssetsFileIOS를 통해 copyPath에 파일을 360x360 사이즈로 복사합니다.
      fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, width, height, 1.0, 1.0, 'contain');
    }

    return fileURI;
  };

  //camera roll 에 접근할 수 있는지
  useEffect(() => {
    const requestPermission = async () => {
      await hasAndroidPermission;
      getGalleryPhotos();
    };

    requestPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* 상단 탭 */}
      <View style={styles.topTab}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cancelIcon} style={styles.cancelIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backspaceIcon} style={styles.backspaceIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 이미지 */}
      {type === 'main' ? (
        <View
          style={[
            styles.imageBackground,
            {
              backgroundColor: selectedImageUri ? '#171717' : '#D9D9D9',
            },
          ]}>
          {selectedImageUri && (
            <Image source={{uri: selectedImageUri}} style={{width: '100%', height: '100%'}} resizeMode="contain" />
          )}
        </View>
      ) : (
        <View
          style={[
            styles.imageBackground,
            {
              backgroundColor: additionalImageUri[index as number] ? '#171717' : '#D9D9D9',
            },
          ]}>
          {additionalImageUri[index as number] && (
            <Image
              source={{uri: additionalImageUri[index as number]}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          )}
        </View>
      )}

      {/* 최근 항목 텍스트 */}
      <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20, gap: 12, height: 70}}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>최근 항목</Text>
        <Image source={arrowIcon} style={{width: 6.5, transform: [{rotate: '90deg'}]}} resizeMode="contain" />
      </View>

      {/* 갤러리 이미지 리스트 */}
      <FlatList
        key="gallery"
        data={galleryList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          width: SCREEN_WIDTH,
          gap: 10,
        }}
        columnWrapperStyle={{gap: 10}}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH / 4,
          offset: (SCREEN_WIDTH / 4) * (index + 3),
          index,
        })}
        numColumns={4}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          //화면의 맨 끝에 도달했을 때 getPhotos 함수 호출
          if (galleryCursor) getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          const isSelected = index === selectedImageIndex;

          return (
            <TouchableOpacity onPress={() => selectImage(item, index)}>
              <Image
                source={{uri: item.thumbnailUri || item.node.image.uri}}
                style={{
                  width: (SCREEN_WIDTH - 30) / 4,
                  height: (SCREEN_WIDTH - 30) / 4,
                }}
              />
              {isSelected && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#FFD600',
                      borderRadius: 10,
                    }}>
                    <Image source={checkIcon} style={{width: 12, height: 12}} resizeMode="contain" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingRight: 19,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backspaceIcon: {width: 20, height: 30, transform: [{scaleX: -1}]},
  cancelIcon: {width: 30, height: 30},
  imageBackground: {
    width: SCREEN_WIDTH - 40,
    height: SCREEN_WIDTH - 40,
    marginHorizontal: 20,
  },
});
