import { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermission, useCameraDevices, Camera, CameraPermissionStatus, CameraRuntimeError, useCameraDevice } from 'react-native-vision-camera';

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

export function Example(): React.JSX.Element {
  console.log("App Started");

  useEffect(() => {
    requestCameraPermission();
  }, []);
  
  const device = useCameraDevice('front');

  if (device == null){ 
    return <Text>Loading</Text>
  }else{
    return (
      <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}>
      </Camera>
    )
  }
}

/*
const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if(!hasPermission){
      requestPermission();
    }
  }, [hasPermission]);

  if(!device){
    return <Text>카메라 없음</Text>
  }

  return(
    <SafeAreaView style={{flex:1}}>
      <Camera 
      device={device}
      isActive={true}
      style={StyleSheet.absoluteFill}
      />
    </SafeAreaView>
  );

*/