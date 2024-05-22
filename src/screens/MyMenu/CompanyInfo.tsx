import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import { SafeAreaView } from "react-native-safe-area-context";

function CompanyInfo(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="사업자 정보"/>
    </SafeAreaView>
  );
}

export default CompanyInfo;