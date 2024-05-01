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
};
