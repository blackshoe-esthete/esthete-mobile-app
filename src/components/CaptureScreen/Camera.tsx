import React, {useState, useCallback, useRef, useEffect, forwardRef} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  GestureResponderEvent,
  useWindowDimensions,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  interpolate,
  Extrapolation,
  useAnimatedProps,
  runOnJS,
} from 'react-native-reanimated';
import Reanimated from 'react-native-reanimated';
import {
  Camera,
  useCameraDevice,
  CameraProps,
  PhotoFile,
} from 'react-native-vision-camera';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

type Props = {
  ratio? : number | undefined;
  // children : JSX.Element;
}

const CameraFn = forwardRef< Camera, Props>((props: any, ref: any): React.JSX.Element  => {
  const {width} = useWindowDimensions();
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front');
  const [photo, setPhoto] = useState<PhotoFile>();
  // const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition);
  const zoom = useSharedValue(device?.neutralZoom ?? 0);
  const zoomOffset = useSharedValue(0);

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

  // const photo = await camera.current?.takePhoto({
  //   flash: 'on',
  //   enableAutoRedEyeReduction: true
  // })

  //클릭한 곳으로 focus
  const onFocusTap = useCallback(
    ({nativeEvent: event}: GestureResponderEvent) => {
      if (!device?.supportsFocus) return;
      ref.current?.focus({
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
  
  return (
    <GestureHandlerRootView>
      {device && (
        <GestureDetector gesture={composed}>
          <Animated.View
           onTouchEnd={onFocusTap} style={{flex: 0.8}}>
            <ReanimatedCamera
              ref={ref}
              style={{
                ...StyleSheet.absoluteFillObject,
                width,     
                height: width * (props.ratio),
                }}
              device={device}
              //isActive={true}
              isActive={true && !photo}
              photo={true}
              animatedProps={animatedProps}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </GestureHandlerRootView>
  );
});

export default CameraFn;

const styles = StyleSheet.create({
});
