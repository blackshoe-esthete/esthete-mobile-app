import MyHeader from '@components/MyGalleryScreen/MyHeader';
import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';
import React, { useState } from 'react';
import {useWindowDimensions, StyleSheet, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { Routes } from '@screens/Routes';
import { useQuery } from '@tanstack/react-query';
import { mineExhibition, mineFilter } from 'src/apis/mygallery';

type Props = NativeStackScreenProps<Routes, 'MyTab'>;

function MyTab({navigation, route}: Props): React.JSX.Element {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '전시'},
    {key: 'second', title: '필터'},
  ]);

  const {data: galleryData} = useQuery({
    queryKey: ['my-gallery'],
    queryFn: mineExhibition
  });

  const {data: filterData} = useQuery({
    queryKey: ['my-filter'],
    queryFn: mineFilter
  });

  const renderScene = SceneMap({
    first: () => <MyCollections props={galleryData} temporary={false}/>,
    second: () => <MyFilter props={filterData} temporary={false}/>
  });

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
      <MyHeader navigation={navigation} route={route} />
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
    marginHorizontal: 20
  },
})