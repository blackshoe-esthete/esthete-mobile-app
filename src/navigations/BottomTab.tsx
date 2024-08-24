import HomeScreen from '../screens/Home/HomeScreen';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text} from 'react-native';
import exhibitionIcon from '@assets/icons/exhibitions.png';
import exhibitionActiveIcon from '@assets/icons/exhibitions_active.png';
import filterIcon from '@assets/icons/filters.png';
import filterActiveIcon from '@assets/icons/filters_active.png';
import additionIcon from '@assets/icons/addition.png';
import additionActiveIcon from '@assets/icons/addition_active.png';
import updatingIcon from '@assets/icons/updating.png';
import updatingActiveIcon from '@assets/icons/updating_active.png';
import galleryIcon from '@assets/icons/gallery.png';
import galleryActiveIcon from '@assets/icons/gallery_active.png';
import FilterNav from './FilterNav';
import {useNavigation, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import GalleryStack from './GalleryStack';
import ExhibitionNav from './ExhibitionNav';
import LoginScreen from '@screens/Login/LoginScreen';
import LoginNav from './LoginNav';
const Tab = createBottomTabNavigator();

function BottomTab(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: ({focused}) => (
          <Text
            style={[
              styles.tabBarText,
              {
                color: focused ? '#FFD600' : '#FFFFFF',
                textShadowColor: focused ? '#FFD600' : 'transparent',
              },
            ]}>
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen
        name="Exhibitions"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={exhibitionActiveIcon} style={styles.exhibitionActiveIcon} resizeMode="contain" />
            ) : (
              <Image source={exhibitionIcon} style={styles.exhibitionIcon} resizeMode="contain" />
            ),
        }}
      />
      <Tab.Screen
        name="Filters"
        component={FilterNav}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={filterActiveIcon} style={styles.filterActiveIcon} resizeMode="contain" />
            ) : (
              <Image source={filterIcon} style={styles.filterIcon} resizeMode="contain" />
            ),
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Addition"
        component={ExhibitionNav}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={additionActiveIcon} style={styles.additionActiveIcon} resizeMode="contain" />
            ) : (
              <Image source={additionIcon} style={styles.additionIcon} resizeMode="contain" />
            ),
        }}
      />
      <Tab.Screen
        name="Updating"
        component={HomeScreen}
        // name="Login"
        // component={LoginNav}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image source={updatingActiveIcon} style={styles.additionActiveIcon} resizeMode="contain" />
            ) : (
              <Image source={updatingIcon} style={styles.additionIcon} resizeMode="contain" />
            ),
            // tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="MyGallery"        
        options={({ route }: any) => {
          const focusedRouteName = getFocusedRouteNameFromRoute(route) || 'MyTab';
        
          return {
            tabBarIcon: ({ focused }) => (
              focused ? (
                <Image
                  source={galleryActiveIcon}
                  style={styles.exhibitionActiveIcon}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={galleryIcon}
                  style={styles.exhibitionIcon}
                  resizeMode="contain"
                />
              )
            ),
            tabBarStyle: focusedRouteName === 'MyTab' ? styles.tabBar : { display: 'none' },
          };
        }}
        
      >
        {(props: any) => <GalleryStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#030303',
    borderTopWidth: 1,
    borderTopColor: '#292929',
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
    height: 90,
    paddingTop: 27,
    paddingBottom: 26,
  },
  tabBarText: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 6,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
  exhibitionIcon: {
    width: 28,
    marginBottom: 12,
  },
  exhibitionActiveIcon: {
    width: 33,
    marginBottom: 15,
  },
  filterIcon: {
    width: 30,
    marginBottom: 15,
  },
  filterActiveIcon: {
    width: 36,
    marginBottom: 15,
  },
  additionIcon: {
    width: 27,
    marginBottom: 15,
  },
  additionActiveIcon: {
    width: 32,
    marginBottom: 15,
  },
});
