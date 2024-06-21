import { FlatList, Image, ImageProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ex1 from '@assets/imgs/gallery1.png';
import ex2 from '@assets/imgs/gallery2.png';
import FilterItem from "@components/MyGalleryScreen/FilterItem";
import TempoItem from "@components/MyMenuScreen/TempoItem";

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps
};
const DATA: galleryProp[] = [
  {id:'1', title: "Filter Name1", src: ex1},
  {id:'2', title: "Filter Name2", src: ex2},
  {id:'3', title: "Filter Name3", src: ex1},
  {id:'4', title: "Filter Name4", src: ex2},
];

function MyFilter(data: any): React.JSX.Element{
  return(
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: galleryProp}) => {
          if(data.temporary){
            return <TempoItem {...item} label="filter" />
          }else{
            return <FilterItem {...item} />;
          }
        }}
      />
    </SafeAreaView>
  );
}

export default MyFilter;