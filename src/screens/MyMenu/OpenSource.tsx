import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import { SafeAreaView } from "react-native-safe-area-context";

function OpenSource(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="오픈소스"/>
    </SafeAreaView>
  );
}

export default OpenSource;