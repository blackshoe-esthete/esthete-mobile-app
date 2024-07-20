import React, {useState} from 'react';
import {ImageProps, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from '@screens/Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuHeader from '@components/MyMenuScreen/MenuHeader';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';
import ex1 from '@assets/imgs/gallery1.png';
import ex2 from '@assets/imgs/gallery2.png';
import { useQuery } from '@tanstack/react-query';
import { myTempExhibition, myTempFilter } from 'src/apis/mygallery';

type Props = NativeStackScreenProps<Routes, 'Temporary'>;
type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
  author?: string;
  date?: string;
};

function Temporary({navigation, route}: Props) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '전시'},
    {key: 'second', title: '필터'},
  ]);
  const {data: myTempGallery} = useQuery({
    queryKey: ['temp-gallery'],
    queryFn: myTempExhibition
  })

  const {data: myTempoFilter} = useQuery({
    queryKey: ['temp-filter'],
    queryFn: myTempFilter
  });

  const renderScene = SceneMap({
    first: () => <MyCollections props={myTempGallery} temporary={true}/>,
    second: () => <MyFilter props={myTempoFilter} temporary={true}/>,
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
