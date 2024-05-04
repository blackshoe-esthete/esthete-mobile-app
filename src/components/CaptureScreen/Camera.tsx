import {useIsForeground} from '@hooks/useIsForeground';
import {useIsFocused} from '@react-navigation/native';
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  GestureResponderEvent,
  useWindowDimensions,
  Platform,
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
  CameraDeviceFormat,
  useCameraFormat,
  CameraDevice,
  Orientation,
} from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
// import useCameraStore from '@store/camera-store';
import useCameraStore from '../../store/camera-store';

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

type Props = {
  ratio?: number | undefined;
  position?: string;
  onInitialized: boolean;
  func: () => void;
};

const CameraFn = forwardRef<Camera, Props>(
  (props: any, ref: any): React.JSX.Element => {
    const {width} = useWindowDimensions();
    const togglePosition = useCameraStore(state => state.togglePosition);
    const [isActive, setIsActive] = useState(Platform.OS === 'ios');
    const [photo, setPhoto] = useState<PhotoFile>();
    const device = useCameraDevice(props.position);
    const zoom = useSharedValue(device?.neutralZoom ?? 0);
    const zoomOffset = useSharedValue(0);
    const isFocused = useIsFocused();
    const isForeground = useIsForeground();

    //카메라 ratio 에 맞춘 사진 저장
    const format = useCameraFormat(device, [{photoAspectRatio: props.ratio}]);

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
        runOnJS(togglePosition);        
      });
    const composed = Gesture.Simultaneous(pinchGesture, tapGesture);

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

    useEffect(() => {
      if (Platform.OS === 'ios') {
        return () => {};
      }

      let timeout: NodeJS.Timeout;

      if (props.onInitialized) {
        timeout = setTimeout(() => setIsActive(true), 150);
      }

      setIsActive(false);
      return () => {
        clearTimeout(timeout);
      };
    }, [props.onInitialized]);

    //디바이스가 바뀔때마다 zoom 값 초기화
    useEffect(() => {
      zoom.value = device?.neutralZoom ?? 1;
    }, [zoom, device]);

    return (
      <GestureHandlerRootView>
        {device && (
          <GestureDetector gesture={composed}>
            <Animated.View onTouchEnd={onFocusTap} style={{flex: 0.8}}>
              <ReanimatedCamera
                ref={ref}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width,
                  height: width * props.ratio,
                }}
                format={format}
                device={device}
                orientation="portrait"
                onInitialized={props.func}
                //orientation 은 아직 실행단계
                //isActive={true}
                isActive={
                  props.onInitialized && !photo && isFocused && isForeground
                }
                photo={true}
                animatedProps={animatedProps}
              />
            </Animated.View>
          </GestureDetector>
        )}
      </GestureHandlerRootView>
    );
  },
);

export default CameraFn;

const styles = StyleSheet.create({});
