import React, { useEffect, useState } from 'react';
import { FC } from 'react';
// import { appStore } from './store';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const PermissionScreen: FC = () => {
  // const { barStyle, backgroundColor } = appStore.useInitTheme();

  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

  const checkCameraPermissionState = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log(cameraPermission, 'camera');
  };

  const checkAudioPermissionState = async () => {
    const micPermission = await Camera.getMicrophonePermissionStatus();
    console.log(micPermission, 'microphone');
  };

  useEffect(() => {
    checkCameraPermissionState();
    checkAudioPermissionState();
  }, []);

  return <GestureHandlerRootView>
    
  </GestureHandlerRootView>;
};