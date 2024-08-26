import React, { useEffect } from 'react';
import { Linking, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera';

const useCameraPermissions = () => {
  useEffect(() => {
    const checkAndRequestCameraPermission = async () => {
      try {
        const cameraPermission = await Camera.getCameraPermissionStatus();

        if (cameraPermission === "authorized") {
          // 카메라 권한이 있을 때 실행할 로직
          console.log('Camera permission already granted.');
        } else if (cameraPermission === 'not-determined') {
          // 카메라 권한 요청
          const newCameraPermission = await Camera.requestCameraPermission();
          
          if (newCameraPermission === "authorized") {
            // 카메라 권한이 부여되었을 때 실행할 로직
            console.log('Camera permission granted after request.');
          } else {
            // 권한 요청이 거부된 경우
            Alert.alert(
              'Permission Denied',
              'Please enable camera access in settings to use this feature.',
              [{ text: 'Open Settings', onPress: () => Linking.openSettings() }]
            );
          }
        } else if (cameraPermission === 'denied') {
          // 권한이 거부된 경우
          Alert.alert(
            'Permission Denied',
            'Please enable camera access in settings to use this feature.',
            [{ text: 'Open Settings', onPress: () => Linking.openSettings() }]
          );
        }
      } catch (error) {
        console.error('Failed to check or request camera permission:', error);
      }
    };

    checkAndRequestCameraPermission();
  }, []);
};

export default useCameraPermissions;
