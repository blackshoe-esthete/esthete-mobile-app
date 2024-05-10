export type RootStackParamList = {
  Main: undefined;
  Map: undefined;
  HomeSearch: undefined;
  Exhibition: undefined;
  ExhibitionEntered: undefined;
  ExhibitionReport: undefined;
  FilterCreation: undefined;
  FilterCreationDesc: undefined;
  FilterCreationGallery: {type: 'main' | 'sub'; index?: number};
  CameraPage: undefined;
  // 다른 스크린의 파라미터 타입도 여기에 정의합니다.
};
