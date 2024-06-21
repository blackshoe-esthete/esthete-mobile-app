import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from '@screens/Routes';
import MyTab from './MyTab';
import MyMenu from '@screens/MyMenu/MyMenu';
import MyLikes from '@screens/MyMenu/MyLikeScreen';
import Temporary from '@screens/MyMenu/TemporaryScreen';
import SubScribe from '@screens/MyMenu/SubscribeScreen';
import Settings from '@screens/MyMenu/SettingScreen';
import Information from '@screens/MyMenu/InformationScreen';
import Logout from '@screens/MyMenu/LogoutScreen';
import PreferEdit from '@screens/MyMenu/PreferEdit';
import ProfileEdit from '@screens/MyMenu/ProfileEdit';
import GoOut from '@screens/MyMenu/GoOut';
import Certification from '@screens/MyMenu/Certification';
import MyInfo from '@screens/MyMenu/MyInfo';
import CompanyInfo from '@screens/MyMenu/CompanyInfo';
import OpenSource from '@screens/MyMenu/OpenSource';
import FilterCreationScreen from '@screens/FilterCreation/FilterCreationScreen';
import ExhibitionCreationScreen from '@screens/ExhibitionCreation/ExhibitionCreationScreen';

const Stack = createNativeStackNavigator();

type Props = NativeStackScreenProps<Routes, 'MyTab'>;
function GalleryStack({navigation, route}: Props): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName="MyTab"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MyTab">
          {(props: any) => <MyTab {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MyMenu">
          {(props: any) => <MyMenu {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MyLikes">
          {(props: any) => <MyLikes {...props} />}
        </Stack.Screen>
        <Stack.Group>
          <Stack.Screen name="Temporary">
            {(props: any) => <Temporary {...props} />}
          </Stack.Screen>
          <Stack.Screen name="FilterCreate">
            {(props: any) => <FilterCreationScreen/>}
          </Stack.Screen>
          <Stack.Screen name="ExhibitionCreate">
            {(props: any) => <ExhibitionCreationScreen {...props} />}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Screen name="SubScribe">
          {(props: any) => <SubScribe {...props} />}
        </Stack.Screen>
        <Stack.Group>
          <Stack.Screen name="Settings">
            {(props: any) => <Settings {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Prefer">
            {(props: any) => <PreferEdit {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {(props: any) => <ProfileEdit {...props} />}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="GoOut">
            {(props: any) => <GoOut {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Certification">
            {(props: any) => <Certification {...props} />}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name="Information">
            {(props: any) => <Information {...props} />}
          </Stack.Screen>
          <Stack.Screen name="MyInfo" >
            {(props: any) => <MyInfo {...props} />}
          </Stack.Screen>
          <Stack.Screen name="CompanyInfo">
            {(props: any) => <CompanyInfo {...props}/>}
          </Stack.Screen>
          <Stack.Screen name="OpenSource">
            {(props: any) => <OpenSource {...props}/>}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Screen name="Logout">
          {(props: any) => <Logout {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default GalleryStack;
