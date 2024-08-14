import { Image, StyleSheet } from "react-native";
import {
  Brightness,
  Contrast,
  SaturationBlend,
  Sepia,
  HueBlend,
  Temperature,
  Grayscale,
  Sharpen,
  
} from "react-native-image-filter-kit";

type filterAttributes = {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  sepia?: number;
  hue?: number;
  temperature?: number;
  grayscale?: number;
  sharpen?: number;
  imageUrl: string;
  width: number;
  height: number;
  maxHeight: number;
};

const IndexFilteredPic = (info: filterAttributes) => {
  const {
    brightness,
    contrast,
    saturation,
    sepia,
    hue,
    temperature,
    grayscale,
    sharpen,
    imageUrl,
    width,
    height,
    maxHeight,
  } = info;

  const attributes = {
    brightness: brightness,
    contrast: contrast,
    saturation: saturation,
    sepia: sepia,
    hue: hue,
    temperature: temperature,
    grayscale: grayscale,
    sharpen: sharpen
  };

  return (
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.imageSize,
          { width: width, height: height, maxHeight: maxHeight },
        ]}
        
      />
  );
};

export default IndexFilteredPic;

const styles = StyleSheet.create({
  imageSize: {
    marginTop: 20,
    resizeMode: "contain",
  },
});
