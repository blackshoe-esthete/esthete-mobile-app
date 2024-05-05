import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyGalleryScreen from "@components/MyGalleryScreen/MyHeader";
import MyTab from "./MyTab";

const Stack = createNativeStackNavigator();

function GalleryStack(): React.JSX.Element{
  return(
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen 
        name="MyTab"
        options={{
          headerShown: false
        }}
        >
          {(props: any) => <MyTab {...props}/>}
        </Stack.Screen>

      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default GalleryStack;