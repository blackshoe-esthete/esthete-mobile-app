import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

export function Example(): React.JSX.Element {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if(!hasPermission){
      requestPermission();
    }
  }, [hasPermission]);

  console.log(hasPermission);

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
}