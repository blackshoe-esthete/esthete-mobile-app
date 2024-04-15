import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import {StyleSheet, View, GestureResponderEvent, Linking} from 'react-native';
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
import { usePreferredCameraDevice } from '@hooks/usePreferredCamera';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

type Props = NativeStackScreenProps<Routes, 'CameraPage'>
function CaptureScreen(): React.JSX.Element {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [enableNightMode, setEnableNightMode] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  //디바이스 설정
  // const [preferredDevice] = usePreferredCameraDevice()
  // let device = useCameraDevice(cameraPosition)

  // if (preferredDevice != null && preferredDevice.position === cameraPosition) {
  //   //사용자가 처음에 하나로 선택함
  //   device = preferredDevice
  // }  
  const device = useCameraDevice('back');

  const zoom = useSharedValue(device?.neutralZoom ?? 0);
  const camera = useRef<Camera>(null);
  const isPressingButton = useSharedValue(false);

  const zoomOffset = useSharedValue(0);
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

  useEffect(() => {
  let a = Camera.getCameraPermissionStatus();
  setCameraPermission(a);
  let b = Camera.getMicrophonePermissionStatus();
  setMicrophonePermission(b);
  }, [cameraPermission, microphonePermission]);

  if(device == null){
    console.log("디바스가 연결이 안됨");
    console.log(Camera.getCameraPermissionStatus());
  }

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
  //       title: 'Cool Photo App Camera Permission',
  //       message:
  //         'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'OK',
  //     });
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   requestCameraPermission();
  // }, []);

  // const requestPermissions = async()=> {
  //   let cameraPermission: CameraPermissionStatus = 'denied';
  //   let microphonePermission: CameraPermissionStatus = 'denied';
  //   try {
  //     cameraPermission = await Camera.requestCameraPermission();
  //     microphonePermission = await Camera.requestMicrophonePermission();
  //   } catch (e) {
  //     console.log(e, 'requestPermissions');
  //   }
  //   return {
  //     camera: cameraPermission,
  //     microphone: microphonePermission,
  //   };
  // };
  // useEffect(() => {
  //   requestPermissions();
  // }, []);

  const requestCameraPermission = React.useCallback( async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission == 'denied')
    {
    console.log("Permission not granted");  
    await Linking.openSettings();
    }
  }, []);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {device != null && (
        // <GestureDetector gesture={gesture}>
        //   <Reanimated.View
        //     onTouchEnd={onFocusTap}
        //     style={StyleSheet.absoluteFill}>
        //     <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>
        //       <ReanimatedCamera
        //         ref={camera}
        //         style={StyleSheet.absoluteFill}
        //         device={device}
        //         isActive={true}
        //         photo={true}
        //         animatedProps={animatedProps}
        //       />
        //     </TapGestureHandler>
        //   </Reanimated.View>
        // </GestureDetector>*/}
        <Camera 
          ref={camera}
          device={device}
          isActive={true}
          style={StyleSheet.absoluteFill}
        />
      )} 
      
    </SafeAreaView>
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
    // bottom: SAFE_AREA_PADDING.paddingBottom,
  },
});
