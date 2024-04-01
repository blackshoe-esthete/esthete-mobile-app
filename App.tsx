import React from 'react';
// import type {PropsWithChildren} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from '@navigations/BottomTab';

function App(): React.JSX.Element {
  // IOS에서는 상태바 색상을 현재 화면의 배경색과 동일하게 하려면 이 방법을 써야함
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
