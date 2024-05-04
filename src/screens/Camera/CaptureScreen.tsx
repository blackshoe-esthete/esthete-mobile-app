import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Linking,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import Reanimated, {useSharedValue} from 'react-native-reanimated';
import {
  Camera,
  CameraPermissionStatus,
  CameraRuntimeError,
  Orientation,
  PhotoFile,
  useCameraDevice,
  VideoFile,
} from 'react-native-vision-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/core';
import {CaptureButton} from '@components/CaptureScreen/CaptureButton';
import {useIsForeground} from '@hooks/useIsForeground';
import {
  SAFE_AREA_PADDING,
  MAX_ZOOM_FACTOR,
  CAPTURE_BUTTON_SIZE,
} from '../../../Constants';
import backIcon from '@assets/icons/backspace_white.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ratio1 from '@assets/icons/ratio_1_1.png';
import ratio2 from '@assets/icons/ratio_4_3.png';
import ratio3 from '@assets/icons/ratio_9_16.png';
import search from '@assets/icons/search_blackback.png';
import edit from '@assets/icons/_edit-icon.png';
import CameraFn from '@components/CaptureScreen/Camera';
import convert from '@assets/icons/convert_white.png';
import useCameraStore from '../../store/camera-store';
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
//안드로이드 버전 사진촬영 함수
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Sample Photo App Camera Permission',
        message:
          'Sample Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
function CaptureScreen({navigation, route}: Props): React.JSX.Element {
  const {top} = useSafeAreaInsets();
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  // const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);
  const currentPosition = useCameraStore(state => state.getCurrentPosition());
  const togglePosition = useCameraStore(state => state.togglePosition);
  const [cameraRatio, setCameraRatio] = useState(0); //카메라 비율 조절
  const [aspect, setAspect] = useState(1 / 1);
  const [icon, setIcon] = useState(ratio1);
  const [photo, setPhoto] = useState<PhotoFile>();
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionStatus>();
  const device = useCameraDevice(currentPosition);
  const zoom = useSharedValue(device?.neutralZoom ?? 0);
  const camera = useRef<Camera>(null);
  const isPressingButton = useSharedValue(false);
  const isFocussed = useIsFocused(); //현재 화면이 활성화
  const isForeground = useIsForeground(); //현재 페이지 활성화
  const isActive = isFocussed && isForeground;
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);
  const supportsFlash = device?.hasFlash ?? false;

  // 카메라 촬영했는지 여부
  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton;
    },
    [isPressingButton],
  );
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  // //카메라 촬영버튼 클릭 여부 초기화
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  //사진 촬영 useCallback()
  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`);
      navigation.navigate('MediaPage', {
        path: media.path,
        type: type,
      });
    },
    [navigation],
  );

  //ratio 버튼 클릭할때마다 달라지는 화면배율
  const changeRatio = useCallback(() => {
    setCameraRatio((cameraRatio + 1) % 3);
  }, [cameraRatio]);
  const getRatioIcon = useCallback(() => {
    switch (cameraRatio) {
      case 0:
        return {aspect: 1 / 1, iconSource: ratio1};
      case 1:
        return {aspect: 4 / 3, iconSource: ratio2};
      case 2:
        return {aspect: 16 / 9, iconSource: ratio3};
      default:
        return {aspect: 1 / 1, iconSource: ratio1}; // 기본값 설정
    }
  }, [cameraRatio]);
  useEffect(() => {
    const ratioInfo = getRatioIcon();
    setAspect(ratioInfo.aspect);
    setIcon(ratioInfo.iconSource);
  }, [cameraRatio]);

  //사진업로드 함수
  const uploadPhoto = async () => {
    if (!photo) return;
    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    //데이터를 s3나 네트워크를 통해 업로드
  };

  //플래시 활성화
  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  //안드로이드 버전 카메라 허용
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    let a = Camera.getCameraPermissionStatus();
    setCameraPermission(a);
    let b = Camera.getMicrophonePermissionStatus();
    setMicrophonePermission(b);
  }, [cameraPermission, microphonePermission]);

  const requestCameraPermission = React.useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission == 'denied') {
      console.log('Permission not granted');
      await Linking.openSettings();
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} style={styles.icon} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', width: 'auto', gap: 10}}>
            <TouchableOpacity onPress={togglePosition}>
              <Image source={convert} style={{width: 30, height:30, backgroundColor: 'white'}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={changeRatio}>
              <Image source={icon} style={styles.ratioIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 카메라 기능 function */}
        {camera && (
          <CameraFn
            ratio={aspect}
            ref={camera}
            position={currentPosition}
            onInitialized={isCameraInitialized}
            func={onInitialized}
          />
        )}

        <View style={styles.bottom}>
          <View style={styles.bottomIconBox}>
            <TouchableOpacity>
              <Image source={edit} style={{marginLeft: 50}} />
            </TouchableOpacity>
            <CaptureButton
              style={styles.button}
              camera={camera}
              onMediaCaptured={onMediaCaptured}
              cameraZoom={zoom}
              minZoom={minZoom}
              maxZoom={maxZoom}
              flash={supportsFlash ? flash : 'off'}
              enabled={isCameraInitialized && isActive}
              setIsPressingButton={setIsPressingButton}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FilterSearchSingle', {
                  screen: 'FilterSearchPage',
                })
              }>
              <Image source={search} style={{marginRight: 50}} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#030303',
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: 20,
    borderColor: 'white',
  },
  headerBox: {
    height: 90,
    backgroundColor: '#030303',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 8.5,
    height: 20,
    marginLeft: 20,
  },
  ratioIcon: {
    marginRight: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 109,
  },
  bottomIconBox: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
