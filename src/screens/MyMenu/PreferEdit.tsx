import MenuHeader from "@components/MyMenuScreen/MenuHeader";
import Preferred from "@components/SettingScreen/Preferred";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function PreferEdit(){
  return(
    <SafeAreaView edges={['top']}>
      <MenuHeader title="선호 태그 편집"/>
      <Preferred />
    </SafeAreaView>
  )
}

export default PreferEdit;