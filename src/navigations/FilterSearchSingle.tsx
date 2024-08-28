import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilterSearchScreen from "@screens/FilterSearch/FilterSearchScreen";
import FilterIndexScreen from "@screens/FilterSearch/FilterIndexScreen";
import RenderItem from "@components/FilterSearchScreen/RenderItem";
import FilterItem from "@components/MyGalleryScreen/FilterItem";

const Stack = createNativeStackNavigator();

//index 있는 필터로 이동

function FilterSearchSingle(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="FilterSearchPage" options={{ headerShown: false }}>
          {(props: any) => <FilterSearchScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RenderItem" options={{ headerShown: false }}>
          {(props: any) => <RenderItem {...props} />}
        </Stack.Screen>
        <Stack.Screen name="FilterIndexScreen" options={{ headerShown: false }}>
          {(props: any) => <FilterIndexScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="FilterItemBox" options={{ headerShown: false }}>
          {(props: any) => <FilterItem {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default FilterSearchSingle;
