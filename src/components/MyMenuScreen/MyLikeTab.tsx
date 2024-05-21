import MyCollections from '@screens/MyGallery/MyCollections';
import MyFilter from '@screens/MyGallery/MyFilter';
import React, {useState} from 'react';
import {  
  useWindowDimensions,
  StyleSheet,
  Text,
  ImageProps
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ex1 from '@assets/imgs/gallery1.png';
import ex2 from '@assets/imgs/gallery2.png';

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
  author?: string;
  date?: string;
};
const DATA: galleryProp[] = [
  {id:'1', title: "전시회명", src: ex1, author: "작가명"},
  {id:'2', title: "전시회명", src: ex2, author: "작가명"},
  {id:'3', title: "전시회명", src: ex1, author: "작가명"},
  {id:'4', title: "전시회명", src: ex2, author: "작가명"},
];
function MyLikeTab(): React.JSX.Element {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '전시'},
    {key: 'second', title: '필터'},
  ]);

  const renderScene = SceneMap({
    first: () => <MyCollections props={DATA} temporary={false}/>,
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
    marginHorizontal: 20
  },
});
