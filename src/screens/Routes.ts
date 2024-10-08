export type Routes = {
  CameraPage: undefined;
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
  };
  HomeScreen: undefined;
  FilterSearchPage: undefined;
  FilterIndexScreen: {filterId: string} | undefined;
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
  GoOut: undefined;
  Certification: undefined;
  Settings: undefined;
  MyInfo: undefined;
  CompanyInfo: undefined;
  OpenSource: undefined;
  Profile: {imageUri: string} | undefined;
  GetPhotoScreen: undefined;
  Friends: undefined;
  ProfileEdit: {imageUri?: string, currentImage?: string} | undefined;
  LoginPage: undefined;
  SignUp1: undefined;
  SignUp2: {socialToken?: string, provider: string, label?: string, email?: string} | undefined;
  SocialSignUp1: {socialToken?: string, provider: string} | undefined;
  FilterItemBox: {filter_id?: string, filter_name?: string, filter_thumbnail_url?: string, navigation?: string, route?: string} | undefined;
};
