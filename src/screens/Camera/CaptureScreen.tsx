import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '../Routes';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  Linking,
  PermissionsAndroid,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import {
  Camera,
  CameraPermissionStatus,
  CameraDevice,
  CameraProps,
  CameraRuntimeError,
  PhotoFile,
  useCameraDevice,
  useCameraDevices,
  useCameraFormat,
  useFrameProcessor,
  VideoFile,
  TakePhotoOptions,
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
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import backIcon from '@assets/icons/backspace_white.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ratio1 from '@assets/icons/ratio_1_1.png';
import ratio2 from '@assets/icons/ratio_4_3.png';
import ratio3 from '@assets/icons/ratio_9_16.png';
import search from '@assets/icons/search_blackback.png';
import edit from '@assets/icons/filter_apply.png';

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
  // const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  // const [flash, setFlash] = useState<TakePhotoOptions['flash']>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'front',
  );
  const [cameraRatio, setCameraRatio] = useState(0); //카메라 비율 조절
  const [photo, setPhoto] = useState<PhotoFile>();
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] =
    useState<CameraPermissionStatus>();
  const device = useCameraDevice(cameraPosition);
  const zoom = useSharedValue(device?.neutralZoom ?? 0);
  const camera = useRef<Camera>(null);
  const isPressingButton = useSharedValue(false);
  const zoomOffset = useSharedValue(0);
  const isFocussed = useIsFocused(); //현재 화면이 활성화
  const isForeground = useIsForeground(); //현재 페이지 활성화
  const isActive = isFocussed && isForeground;
  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);
  const supportsFlash = device?.hasFlash ?? false;

  //pinch할때마다 zoom의 배율이 달라짐
  const pinchGesture = Gesture.Pinch()
    .onBegin(e => {
      'worklet';
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
      'worklet';
      const z = zoomOffset.value * event.scale;
      zoom.value = interpolate(
        z,
        [1, 10],
        [device?.minZoom ?? 1, device?.maxZoom ?? 16],
        Extrapolation.CLAMP,
      );
    });

  const animatedProps = useAnimatedProps<CameraProps>(
    () => ({zoom: zoom.value}),
    [zoom],
  );
  //두번 클릭해서 카메라 방향 반대 useCallback()
  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      'worklet';
      runOnJS(setCameraPosition)(p => (p === 'back' ? 'front' : 'back'));
    });
  const composed = Gesture.Simultaneous(pinchGesture, tapGesture);

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

  //카메라 촬영버튼 클릭 여부 초기화
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
      // navigation.navigate('HomeScreen');
    },
    [navigation],
  );
  //사진촬영 함수 재정의
  const onTakePicture = async () => {
    const photo = await camera.current?.takePhoto();
    setPhoto(photo);
  };

  //ratio 버튼 클릭할때마다 달라지는 화면배율
  const rationFn = () => {
    setCameraRatio(() => (cameraRatio + 1) % 3);
  };
  let format = useCameraFormat(device, [
    {photoAspectRatio: 4 / 3},
    {videoResolution: {width: 3048, height: 2160}},
    {fps: 60},
  ]);
  const changeRatio = useCallback(() => {
    if (cameraRatio == 0) {
      let format = useCameraFormat(device, [
        {photoAspectRatio: 1 / 1},
        {videoResolution: {width: 3048, height: 2160}},
        {fps: 60},
      ]);
      return <Image source={ratio1} style={styles.ratioIcon} />;
    } else if (cameraRatio == 1) {
      format = useCameraFormat(device, [
        {photoAspectRatio: 4 / 3},
        {videoResolution: {width: 3048, height: 2160}},
        {fps: 60},
      ]);
      return <Image source={ratio2} style={styles.ratioIcon} />;
    } else {
      let format = useCameraFormat(device, [
        {photoAspectRatio: 16 / 9},
        {videoResolution: {width: 3048, height: 2160}},
        {fps: 60},
      ]);
      return <Image source={ratio3} style={styles.ratioIcon} />;
    }
  }, [cameraRatio]);
  // const format = useCameraFormat(device, [
  //   { videoAspectRatio: 16 / 9 },
  //   { videoResolution: { width: 3048, height: 2160 } },
  //   { fps: 60 }
  // ])

  //사진업로드 함수
  const uploadPhoto = async () => {
    if (!photo) return;
    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    //데이터를 s3나 네트워크를 통해 업로드
  };

  //클릭한 곳으로 focus
  const onFocusTap = useCallback(
    ({nativeEvent: event}: GestureResponderEvent) => {
      if (!device?.supportsFocus) return;
      camera.current?.focus({
        x: event.locationX,
        y: event.locationY,
      });
    },
    [device?.supportsFocus],
  );

  //디바이스가 바뀔때마다 zoom 값 초기화
  useEffect(() => {
    zoom.value = device?.neutralZoom ?? 1;
  }, [zoom, device]);

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
          <TouchableOpacity onPress={rationFn}>
            {changeRatio()}
          </TouchableOpacity>
        </View>
        {photo ? (
          <Image source={{uri: photo.path}} style={StyleSheet.absoluteFill} />
        ) : (
          <>
            {/* <Pressable style={styles.button} onPress={onTakePicture} /> */}

            {device != null && (
              <GestureDetector gesture={composed}>
                <Animated.View onTouchEnd={onFocusTap} style={{flex: 0.8}}>
                  <ReanimatedCamera
                    ref={camera}
                    style={StyleSheet.absoluteFill}
                    format={format}
                    // style={{flex:0.8}}
                    device={device}
                    //isActive={true}
                    isActive={true && !photo}
                    photo={true}
                    animatedProps={animatedProps}
                  />
                </Animated.View>
              </GestureDetector>
            )}
            {/* <CaptureButton
              style={styles.captureButton}
              camera={camera}
              // onMediaCaptured={onMediaCaptured}
              onMediaCaptured={onTakePicture}
              cameraZoom={zoom}
              minZoom={minZoom}
              maxZoom={maxZoom}
              flash={supportsFlash ? flash : 'off'}
              enabled={isCameraInitialized && isActive}
              setIsPressingButton={setIsPressingButton}
            /> */}
            <View style={styles.bottom}>
              <View style={styles.bottomIconBox}>
                <TouchableOpacity>
                  <Image source={edit} style={{marginLeft: 50}}/>
                </TouchableOpacity>
                <Pressable style={styles.button} onPress={onTakePicture} />
                <TouchableOpacity >
                  <Image source={search} style={{marginRight: 50}} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
  captureBox: {
    bottom: 109,
    height: 105,
    zIndex: 1,
  },
  // captureButton: {
  //   position: 'absolute',
  //   alignSelf: 'center',
  //   bottom: SAFE_AREA_PADDING.paddingBottom,
  // },
  button: {
    // width: CAPTURE_BUTTON_SIZE,
    // height: CAPTURE_BUTTON_SIZE,
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
    // backgroundColor: 'white',
    // bottom: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 30,
    height: 30,
  },
});
