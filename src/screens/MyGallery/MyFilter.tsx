import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ex1 from '@assets/imgs/gallery1.png';
import ex2 from '@assets/imgs/gallery2.png';
import FilterItem from "@components/MyGalleryScreen/FilterItem";
import TempoItem from "@components/MyMenuScreen/TempoItem";

type galleryProp = {
  filter_id: string;
  filter_name: string;
  filter_thumbnail_url: string;
};

function MyFilter(data: any): React.JSX.Element{
  return(
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={data.props}
        keyExtractor={item => item.filter_id}
        renderItem={({item}: {item: galleryProp}) => {
          if(data.temporary){
            // return <TempoItem {...item} label="filter" />
            return <FilterItem {...item} />
          }else{
            return <FilterItem {...item} />;
          }
        }}
      />
    </SafeAreaView>
  );
}

export default MyFilter;