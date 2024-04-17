import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ExhibitionSearchScreen from '@screens/Home/ExhibitionSearchScreen';
import AuthorSearchScreen from '@screens/Home/AuthorSearchScreen';
import {Text} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function HomeSearchTopTab(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? '#FFF' : '#D6D6D6',
              fontSize: 16,
              fontWeight: focused ? 600 : 400,
            }}>
            {route.name}
          </Text>
        ),
        tabBarIndicatorStyle: {
          backgroundColor: '#FFF',
          height: 1,
        },
        tabBarStyle: {
          backgroundColor: '#000',
          marginTop: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#D6D6D6',
        },
      })}
      initialRouteName="전시회">
      <Tab.Screen name="전시회" component={ExhibitionSearchScreen} />
      <Tab.Screen name="작가" component={AuthorSearchScreen} />
    </Tab.Navigator>
  );
}

export default HomeSearchTopTab;
