import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, ActivityIndicator, PermissionsAndroid, Platform, useWindowDimensions} from 'react-native';
import {SAFE_AREA_PADDING} from '../../../Constants';
import {useIsForeground} from '../../hooks/useIsForeground';
import {PressableOpacity} from 'react-native-pressable-opacity';
// import IonIcon from 'react-native-vector-icons/Ionicons'
// import Video, { LoadError, OnLoadData } from 'react-native-video'
import {Alert} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Routes} from '../Routes';
import {useIsFocused} from '@react-navigation/core';
import FastImage, {OnLoadEvent} from 'react-native-fast-image';
import {Orientation, useCameraDevice} from 'react-native-vision-camera';
import ImageResizer from '@bam.tech/react-native-image-resizer';
// import useCameraStore from '@store/camera-store';
import useCameraStore from '../../store/camera-store';

const requestSavePermission = async (): Promise<boolean> => {
  // On Android 13 and above, scoped storage is used instead and no permission is needed
  if (Platform.OS !== 'android' || Platform.Version >= 33) return true;

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) return false;
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(permission);
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

type Props = NativeStackScreenProps<Routes, 'MediaPage'>;
function MediaPage({navigation, route}: Props): React.ReactElement {
  const {path, type} = route.params;
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const isForeground = useIsForeground();
  const isScreenFocused = useIsFocused();
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none');

  const onMediaLoad = useCallback((event: OnLoadEvent) => {
    console.log(`Image loaded. Size: ${event.nativeEvent.width}x${event.nativeEvent.height}`);
  }, []);
  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
    setHasMediaLoaded(true);
  }, []);
  const {width, height} = useWindowDimensions();

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');

      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.',
        );
        return;
      }
      await CameraRoll.save(`file://${path}`, {
        type: type,
      });
      setSavingState('saved');
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert('Failed to save!', `An unexpected error occured while trying to save your ${type}. ${message}`);
    }
  }, [path, type]);

  const currentPosition = useCameraStore(state => state.getCurrentPosition());
  const device = useCameraDevice(currentPosition);
  const orientationToRotationAngle = (orientation: Orientation) => {
    switch (orientation) {
      case 'portrait':
        return 90;
      case 'portrait-upside-down':
        return 180;
      case 'landscape-left':
        return 90;
      case 'landscape-right':
        return 0;
      default:
        return 0;
    }
  };
  const [uri, setUri] = useState(`file://${path}`);

  useEffect(() => {
    const fetchData = async () => {
      if (device && path) {
        const newUri = (
          await ImageResizer.createResizedImage(
            `file://${path}`,
            1200,
            720,
            'JPEG',
            90,
            orientationToRotationAngle(device.sensorOrientation),
          )
        ).uri;
        setUri(newUri);
      }
    };
    fetchData();
  }, [device, path]);

  /*
    path,
  maxWidth,
  maxHeight,
  compressFormat,
  quality,
  rotation,
  outputPath
  */

  // const source = useMemo(() => ({ uri: uri }), [uri]);
  const source = useMemo(() => ({uri: `file://${path}`}), [path]);

  const screenStyle = useMemo(() => ({opacity: hasMediaLoaded ? 1 : 0}), [hasMediaLoaded]);

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <FastImage
          source={source}
          // source={uri}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}

      {/* <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </PressableOpacity>

      <PressableOpacity style={styles.saveButton} onPress={onSavePressed} disabled={savingState !== 'none'}>
        {savingState === 'none' && <IonIcon name="download" size={35} color="white" style={styles.icon} />}
        {savingState === 'saved' && <IonIcon name="checkmark" size={35} color="white" style={styles.icon} />}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>

      <StatusBarBlurBackground /> */}
    </View>
  );
}

export default MediaPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageSize: {},
  closeButton: {
    position: 'absolute',
    // top: SAFE_AREA_PADDING.paddingTop,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingLeft,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});
