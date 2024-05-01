import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, View, ViewProps, TouchableOpacity} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Reanimated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withRepeat,
  useHandler,
} from 'react-native-reanimated';
import type {Camera, PhotoFile, VideoFile} from 'react-native-vision-camera';
import {
  CAPTURE_BUTTON_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../Constants';
import Animated from 'react-native-reanimated';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import cameraHook from '@hooks/CaeraRollPermission';

const PAN_GESTURE_HANDLER_FAIL_X = [-SCREEN_WIDTH, SCREEN_WIDTH];
const PAN_GESTURE_HANDLER_ACTIVE_Y = [-2, 2];

const START_RECORDING_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface Props extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (
    media: PhotoFile | VideoFile,
    type: 'photo' | 'video',
  ) => void;
  minZoom: number;
  maxZoom: number;
  cameraZoom: Reanimated.SharedValue<number>;
  flash: 'off' | 'on';
  enabled: boolean;
  setIsPressingButton: (isPressingButton: boolean) => void;
}

const _CaptureButton: React.FC<Props> = ({
  camera,
  onMediaCaptured,
  minZoom,
  maxZoom,
  cameraZoom,
  flash,
  enabled,
  setIsPressingButton,
  style,
  ...props
}): React.ReactElement => {
  const pressDownDate = useRef<Date | undefined>(undefined);
  const isPressingButton = useSharedValue(false);

  //camera roll 에 접근할 수 있는지
  useEffect(() => {
    cameraHook.hasAndroidPermission;
  })

  //#region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      console.log('Taking photo...');
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: flash,
        enableShutterSound: false,
      });
      onMediaCaptured(photo, 'photo');
      cameraHook.savePicture({tag: `file://${photo.path}`, album: 'photo'});
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, flash, onMediaCaptured]);
  //#region Tap handler
  // const tapHandler = useRef<TapGestureHandler>();
  // const onHandlerStateChanged = useCallback(
  //   async ({nativeEvent: event}: TapGestureHandlerStateChangeEvent) => {
  //     // console.debug(`state: ${Object.keys(State)[event.state]}`);
  //     switch (event.state) {
  //       case State.CANCELLED: {
  //         try {
  //           if (pressDownDate.current == null)
  //             throw new Error('PressDownDate ref .current was null!');
  //           const now = new Date();
  //           const diff = now.getTime() - pressDownDate.current.getTime();
  //           pressDownDate.current = undefined;
  //           if (diff < START_RECORDING_DELAY) {
  //             await takePhoto();
  //           }
  //         } finally {
  //           setTimeout(() => {
  //             isPressingButton.value = false;
  //             setIsPressingButton(false);
  //           }, 500);
  //         }
  //         return;
  //       }
  //       default:
  //         break;
  //     }
  //   },
  //   [isPressingButton, setIsPressingButton, takePhoto],
  // );

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={takePhoto} />
    </>
  );
};

export const CaptureButton = React.memo(_CaptureButton);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: 8,
    borderColor: '#666666',
    backgroundColor: 'white'
  },
});
