// components/ExhibitionCreationScreen.tsx
import {CameraRoll, PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import hasAndroidPermission from '@hooks/CameraRollPermission';
import nextIcon from '@assets/icons/backspace_white.png';
import cancelIcon from '@assets/icons/cancel_black.png';
import arrowIcon from '@assets/icons/arrow.png';
import checkIcon from '@assets/icons/check.png';
import useExhibitionCreationStore from '../../store/ExhibitionCreationStore';
import Carousel from 'react-native-reanimated-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface GalleryItem extends PhotoIdentifier {
  thumbnailUri?: string;
}

function ExhibitionCreationScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const {selectedImageUri, setSelectedImageUri, additionalImageUri, setAdditionalImageUri} =
    useExhibitionCreationStore();
  const [galleryCursor, setGalleryCursor] = useState<string | undefined>();
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [multiSelectEnabled, setMultiSelectEnabled] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const onPressNext = () => {
    if (!selectedImageUri && additionalImageUri.length === 0) {
      Alert.alert('이미지를 선택해주세요');
      return;
    }
    navigation.goBack();
  };

  const selectImage = async (item: GalleryItem, index: number) => {
    const originalUri =
      Platform.OS === 'ios'
        ? await phPathToFilePath(item.node.image.uri, item.node.image.width, item.node.image.height)
        : item.node.image.uri;

    const identifier = item.node.image.filename || originalUri;

    if (multiSelectEnabled) {
      if (additionalImageUri.some(image => image.identifier === identifier)) {
        setAdditionalImageUri(additionalImageUri.filter(image => image.identifier !== identifier));
      } else {
        setAdditionalImageUri([...additionalImageUri, {uri: originalUri, identifier}]);
      }
    } else {
      setSelectedImageUri(originalUri);
      setAdditionalImageUri([{uri: originalUri, identifier}]);
    }
    setSelectedImageIndex(index);
  };

  const getGalleryPhotos = async () => {
    const params = {
      first: 16,
      ...(galleryCursor && {after: galleryCursor}),
    };

    try {
      const {edges, page_info} = await CameraRoll.getPhotos(params);

      if (page_info.has_next_page) {
        setGalleryCursor(page_info.end_cursor);
      } else {
        setGalleryCursor(undefined);
      }

      const newGalleryList = [...galleryList];

      if (Platform.OS === 'ios') {
        for await (const item of edges) {
          const thumbnailUri = await phPathToFilePath(item.node.image.uri, 300, 300);
          newGalleryList.push({...item, thumbnailUri});
        }
      } else {
        newGalleryList.push(...edges);
      }

      setGalleryList(newGalleryList);
    } catch (error) {
      console.log('[getGalleryPhotos error]', error);
    }
  };

  const phPathToFilePath = async (uri: string, width: number, height: number) => {
    let fileURI = encodeURI(uri);

    if (uri.startsWith('ph://')) {
      const copyPath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
      fileURI = await RNFS.copyAssetsFileIOS(uri, copyPath, width, height, 1.0, 1.0, 'contain');
    }

    return fileURI;
  };

  useEffect(() => {
    const requestPermission = async () => {
      const hasPermission = await hasAndroidPermission;
      if (hasPermission) {
        getGalleryPhotos();
      } else {
        Alert.alert('Permission required', 'Camera roll permission is required to access the gallery.');
      }
    };

    requestPermission();
  }, []);

  // 추가된 useEffect: 선택된 이미지가 없을 때 첫 번째 이미지 자동 선택
  useEffect(() => {
    if (galleryList.length > 0 && additionalImageUri.length === 0) {
      selectImage(galleryList[0], 0);
    }
  }, [galleryList]);

  return (
    <View style={{flex: 1}}>
      {/* 상단 탭 */}
      <View style={styles.topTab}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={cancelIcon} style={styles.cancelIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext}>
          <Image source={nextIcon} style={styles.nextIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 이미지 Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop={false}
          width={SCREEN_WIDTH - 40}
          height={(SCREEN_WIDTH - 40) * 0.75}
          data={
            additionalImageUri.length > 0
              ? additionalImageUri.map(image => image.uri)
              : [selectedImageUri].filter(Boolean)
          }
          scrollAnimationDuration={1000}
          onSnapToItem={index => setCurrentImageIndex(index)}
          renderItem={({item}) => <Image source={{uri: item}} style={styles.carouselImage} resizeMode="contain" />}
        />
      </View>

      {/* 최근 항목 & 선택 텍스트 */}
      <View style={styles.recentItems}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.recentItemsText}>최근 항목</Text>
          <Image source={arrowIcon} style={styles.arrowIcon} resizeMode="contain" />
        </View>
        <TouchableOpacity onPress={() => setMultiSelectEnabled(!multiSelectEnabled)}>
          <Text style={styles.multiSelectText}>{multiSelectEnabled ? '단일 선택' : '여러장 선택'}</Text>
        </TouchableOpacity>
      </View>

      {/* 갤러리 이미지 리스트 */}
      <FlatList
        key="gallery"
        data={galleryList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.galleryContainer}
        columnWrapperStyle={{gap: 5}}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH / 4,
          offset: (SCREEN_WIDTH / 4) * (index + 3),
          index,
        })}
        numColumns={4}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (galleryCursor) getGalleryPhotos();
        }}
        renderItem={({item, index}) => {
          const originalUri = Platform.OS === 'ios' ? item.thumbnailUri || item.node.image.uri : item.node.image.uri;
          const identifier = item.node.image.filename || originalUri;
          const selectedIndex = additionalImageUri.findIndex(image => image.identifier === identifier);
          const isSelected = selectedIndex !== -1;

          return (
            <TouchableOpacity onPress={() => selectImage(item, index)}>
              <Image source={{uri: item.thumbnailUri || item.node.image.uri}} style={styles.galleryImage} />
              {isSelected && (
                <View style={styles.overlay}>
                  <View style={styles.checkIconContainer}>
                    {multiSelectEnabled ? (
                      <Text style={styles.checkIndex}>{selectedIndex + 1}</Text>
                    ) : (
                      <Image source={checkIcon} style={{width: 12, height: 12}} resizeMode="contain" />
                    )}
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

export default ExhibitionCreationScreen;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 20},
  topTab: {
    flexDirection: 'row',
    marginTop: 60,
    paddingVertical: 13,
    paddingRight: 19,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextIcon: {width: 20, height: 30, transform: [{scaleX: -1}]},
  cancelIcon: {width: 30, height: 30},
  carouselContainer: {
    width: SCREEN_WIDTH - 40,
    height: (SCREEN_WIDTH - 40) * 0.75,
    marginHorizontal: 20,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  recentItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    gap: 12,
    height: 70,
  },
  recentItemsText: {color: 'white', fontSize: 16, fontWeight: '700', marginRight: 10},
  arrowIcon: {width: 6.5, transform: [{rotate: '90deg'}]},
  multiSelectText: {color: 'white', fontSize: 16, fontWeight: '700', paddingRight: 20},
  galleryContainer: {width: SCREEN_WIDTH, gap: 5},
  galleryImage: {
    width: (SCREEN_WIDTH - 15) / 4,
    height: (SCREEN_WIDTH - 15) / 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  checkIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD600',
    borderRadius: 10,
  },
  checkIndex: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
