import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (+Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (+Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

type cameraSaveProps = {
  tag: string;
  album: "photo" | undefined;
}
async function savePicture(props : cameraSaveProps) {
  const {tag, album} = props;
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  //tag : local img uri , ex)file:///sdcard/img.png
  CameraRoll.save(tag, { type: album })
};

async function getPicture(props: cameraSaveProps){
  // const file = await camera.current.takePhoto()
// const result = await fetch(`file://${file.path}`)
// const data = await result.blob();
}

export default {savePicture, hasAndroidPermission};