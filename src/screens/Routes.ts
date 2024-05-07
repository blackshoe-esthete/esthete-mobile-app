export type Routes = {
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
  HomeScreen: undefined;
  FilterSearchPage: undefined;
  FilterIndexScreen: undefined;
  FilterSearchSingle: {screen: string} | undefined;
  MyGalleryScreen: undefined;
  MyTab: {
    route: string;
    tabBarVisible: boolean;
  };
  MyMenu: undefined;
  MyLikes: undefined;
  Information: undefined;
  Temporary: undefined;
  SubScribe: undefined;
  Settings: undefined;
};
