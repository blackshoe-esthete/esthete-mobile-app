import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import { SafeAreaView } from "react-native-safe-area-context";

function GoOut(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="회원 탈퇴"/>
    </SafeAreaView>
  );
}

export default GoOut;