import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';

type Props = NativeStackScreenProps<Routes, 'Temporary'>;
function Temporary() {
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
    <SafeAreaView edges={['top']} style={styles.root}>
      <MenuHeader title="임시저장" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.container}
      />
    </SafeAreaView>
  );
}

export default Temporary;

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    marginTop: 0,
    marginHorizontal: 20,
  },
});
