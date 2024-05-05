import { FlatList, Image, ImageProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ex1 from '@assets/imgs/gallery1.png';
import ex2 from '@assets/imgs/gallery2.png';
import GalleryItem from "@components/MyGalleryScreen/GalleryItem";

type galleryProp = {
  id: string;
  title: string;
  src: ImageProps
};
const DATA: galleryProp[] = [
  {id:'1', title: "전시회명", src: ex1},
  {id:'2', title: "전시회명", src: ex2},
  {id:'3', title: "전시회명", src: ex1},
  {id:'4', title: "전시회명", src: ex2},
];

function MyCollections(): React.JSX.Element{
  
  return(
    <SafeAreaView>
      <FlatList 
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}: {item: galleryProp})=><GalleryItem  {...item} />}
      />
    </SafeAreaView>
  );
}

export default MyCollections;