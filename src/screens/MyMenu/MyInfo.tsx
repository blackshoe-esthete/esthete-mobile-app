import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import { SafeAreaView } from "react-native-safe-area-context";

function MyInfo () {
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="개인정보처리방침"/>
    </SafeAreaView>
  );
}

export default MyInfo;