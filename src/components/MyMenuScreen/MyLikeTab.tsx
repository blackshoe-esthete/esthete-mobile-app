import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';
import React, {useState} from 'react';
import {  
  useWindowDimensions,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

function MyLikeTab(): React.JSX.Element {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '전시'},
    {key: 'second', title: '필터'},
  ]);

  const renderScene = SceneMap({
    first: MyCollections,
    second: MyFilter,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({route, focused}) =>
        focused ? (
          <Text style={{color: '#FFD600', margin: 8}}>{route.title}</Text>
        ) : (
          <Text style={{color: 'white', margin: 8}}>{route.title}</Text>
        )
      }
      indicatorStyle={{backgroundColor: '#FFD600'}}
      style={{backgroundColor: '#030303'}}
    />
  );

  return (
    <SafeAreaProvider>
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

export default MyLikeTab;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginHorizontal: 20,
  },
});
