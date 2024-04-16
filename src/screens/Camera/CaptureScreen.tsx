import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from '../Routes';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {StyleSheet, View, GestureResponderEvent, Linking, PermissionsAndroid} from 'react-native';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  interpolate,
  Extrapolation,
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
} from 'react-native-vision-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/core';
import { CaptureButton } from '@components/CaptureScreen/CaptureButton';
import { useIsForeground } from '@hooks/useIsForeground';
import { SAFE_AREA_PADDING, MAX_ZOOM_FACTOR, CAPTURE_BUTTON_SIZE } from '../../../Constants';

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
        title: "Sample Photo App Camera Permission",
        message:
        "Sample Photo App needs access to your camera " +
        "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

type Props = NativeStackScreenProps<Routes, 'CameraPage'>
function CaptureScreen({navigation} : Props): React.JSX.Element {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'front',
  );
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
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
  const gesture = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value;
    })
    .onUpdate(event => {
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

  // 카메라 촬영했는지 여부
  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton
    },
    [isPressingButton],
  )
  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  //카메라 촬영버튼 클릭 여부 초기화
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!')
    setIsCameraInitialized(true)
  }, []);;

  //사진 촬영 useCallback()
  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`)
      // navigation.navigate('MediaPage', {
      //   path: media.path,
      //   type: type,
      // });
      navigation.navigate('HomeScreen');
    },
    [navigation],
  );

  //두번 클릭해서 카메라 방향 반대 useCallback()
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
  }, []);

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
  //이중클릭해서 카메라
  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed();
  }, [onFlipCameraPressed]);

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

  // if(device == null){
  //   console.log("디바스가 연결이 안됨");
  //   console.log(Camera.getCameraPermissionStatus());
  // }
  const requestCameraPermission = React.useCallback( async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission == 'denied'){
      console.log("Permission not granted");  
      await Linking.openSettings();
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
      {device != null && (
        <GestureDetector gesture={gesture}>
          <Reanimated.View
            onTouchEnd={onFocusTap}
            style={StyleSheet.absoluteFill}>
            <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
              <ReanimatedCamera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                animatedProps={animatedProps}
              />
            </TapGestureHandler>
          </Reanimated.View>
        </GestureDetector>
      )} 
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? flash : 'off'}
        enabled={isCameraInitialized && isActive}
        setIsPressingButton={setIsPressingButton}
      />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default CaptureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
});
