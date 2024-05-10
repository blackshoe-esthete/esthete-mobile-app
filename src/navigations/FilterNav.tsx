import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme} from '@react-navigation/native';
import CaptureScreen from '@screens/Camera/CaptureScreen';
import FilterSearchSingle from './FilterSearchSingle';
import MediaPage from '@screens/Camera/MediaScreen';

const Stack = createNativeStackNavigator();

const FilterTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...DefaultTheme.colors,
    background: '#030303',
  },
};

function FilterNav(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="CameraPage" options={{headerShown: false}}>
          {(props: any) => <CaptureScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MediaPage" options={{headerShown: false}}>
          {(props: any) => <MediaPage {...props} />}
        </Stack.Screen>
        <Stack.Screen name="FilterSearchSingle" component={FilterSearchSingle} options={{headerShown: false}} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default FilterNav;
