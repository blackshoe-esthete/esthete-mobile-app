import { FilterAttributes } from "./exhibitionCreationStore";

export const adjustAttribute = (
  value: number | undefined,
  scaleFactor: number,
  isInverse: boolean = false
): number | undefined => {
  if (value === undefined) return undefined;

  if (isInverse) {
    // gray_scale의 경우 반대로 작동
    return Math.max(0, Math.min(100, value * (2 - scaleFactor)));
  } else {
    return Math.max(0, value * scaleFactor);
  }
};

type propAttribute = {
  scale: number;
  attributes: FilterAttributes;
};

export const applyAdjustedAttributes = (props: propAttribute) => {
  const { scale, attributes } = props;
  const {
    brightness,
    sharpness,
    exposure,
    contrast,
    saturation,
    hue,
    temperature,
    grayScale,
  } = attributes;

  // scale을 0부터 100까지의 값으로 가정
  const scaleFactor = scale / 50; // 50일 때 1, 0일 때 0, 100일 때 2가 됩니다.

  const adjustedAttributes: FilterAttributes = {
    brightness: adjustAttribute(brightness, scaleFactor),
    sharpness: adjustAttribute(sharpness, scaleFactor),
    exposure: adjustAttribute(exposure, scaleFactor),
    contrast: adjustAttribute(contrast, scaleFactor),
    saturation: adjustAttribute(saturation, scaleFactor),
    hue: adjustAttribute(hue, scaleFactor),
    temperature: adjustAttribute(temperature, scaleFactor),
    grayScale: adjustAttribute(grayScale, scaleFactor, true),
  };
};
