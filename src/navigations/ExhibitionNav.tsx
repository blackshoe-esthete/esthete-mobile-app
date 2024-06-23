import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme} from '@react-navigation/native';
import ExhibitionCreationScreen from '@screens/ExhibitionCreation/ExhibitionCreationScreen';

const Stack = createNativeStackNavigator();

const FilterTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...DefaultTheme.colors,
    background: '#030303',
  },
};

function ExhibitionNav(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="SelectPage" options={{headerShown: false}}>
          {(props: any) => <ExhibitionCreationScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default ExhibitionNav;
