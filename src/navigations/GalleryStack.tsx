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
        <Stack.Screen name="Temporary">
          {(props: any) => <Temporary {...props} />}
        </Stack.Screen>
        <Stack.Screen name="SubScribe">
          {(props: any) => <SubScribe {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props: any) => <Settings {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Information">
          {(props: any) => <Information {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Logout">
          {(props: any) => <Logout {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default GalleryStack;
