import MyHeader from '@components/MyGalleryScreen/MyHeader';
import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';
import React from 'react';
import {View, useWindowDimensions, StyleSheet, StatusBar, Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const renderScene = SceneMap({
  first: MyCollections,
  second: MyFilter,
});

function MyTab(): React.JSX.Element {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '전시'},
    {key: 'second', title: '필터'},
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => 
        focused ? (
        <Text style={{ color: '#FFD600', margin: 8 }}>
          {route.title}
        </Text>
      ) : (
        <Text style={{ color: 'white', margin: 8 }}>
          {route.title}
        </Text>
      )
    }
      indicatorStyle={{ backgroundColor: '#FFD600' }}
      style={{ backgroundColor: '#030303' }}
    />
  );
  
  return (
    <SafeAreaProvider>
      <MyHeader />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.container}
      />
    </SafeAreaProvider>
  );
}

export default MyTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingHorizontal: 20
  },
})