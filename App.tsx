import React from 'react';
// import type {PropsWithChildren} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BottomTab from '@navigations/BottomTab';
import HomeSearchScreen from './src/screens/Home/HomeSearchScreen';
import MapScreen from './src/screens/Home/MapScreen';
import ExhibitionScreen from '@screens/Exhibition/ExhibitionScreen';
import ExhibitionEnteredScreen from '@screens/Exhibition/ExhibitionEnteredScreen';
import ExhibitionReportScreen from '@screens/Exhibition/ExhibitionReportScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#030303',
  },
};

function App(): React.JSX.Element {
  // IOS에서는 상태바 색상을 현재 화면의 배경색과 동일하게 하려면 이 방법을 써야함
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="HomeSearch"
            component={HomeSearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Exhibition"
            component={ExhibitionScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExhibitionEntered"
            component={ExhibitionEnteredScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ExhibitionReport"
            component={ExhibitionReportScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
