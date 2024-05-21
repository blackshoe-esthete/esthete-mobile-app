import { FlatList, ImageProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GalleryItem from "@components/MyGalleryScreen/GalleryItem";
import TempoItem from "@components/MyMenuScreen/TempoItem";

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps;
  author?: string;
  date?: string;
};

function MyCollections(data: any): React.JSX.Element{
  return(
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        data={data.props}
        keyExtractor={item => item.id}
        renderItem={({item}: {item:galleryProp}) => {
          if(data.temporary){
            return <TempoItem {...item} />;
          }else{
            return <GalleryItem {...item} />;
          }
        }}
        contentContainerStyle={{}}
      />
    </SafeAreaView>
  );
}

export default MyCollections;