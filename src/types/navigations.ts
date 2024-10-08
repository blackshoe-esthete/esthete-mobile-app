import {TemporaryFilter} from './filterService.type';
import {ExhibitionData} from './mainExhibitionService.type';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Map: undefined;
  HomeSearch: undefined;
  Exhibition: {id: string};
  Exhibitions: undefined;
  ExhibitionEntered: {id: string; exhibitionData: ExhibitionData};
  ExhibitionReport: {id: string};
  ExhibitionCreation: undefined;
  ExhibitionFilterApply: undefined;
  FilterCreation: TemporaryFilter;
  FilterCreationDesc: TemporaryFilter;
  FilterCreationGallery: {type: 'main' | 'sub'; index?: number};
  CameraPage: undefined;
  ExhibitionFilterApplyAll: undefined;
  // 다른 스크린의 파라미터 타입도 여기에 정의합니다.
};
