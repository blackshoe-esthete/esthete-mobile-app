import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import menu from "@assets/icons/menu.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "../../screens/Routes";
import GalleryProfile from "./GalleryProfile";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "src/apis/userInfo";
import { useEditStore } from "@store/edit-store";

type Props = NativeStackScreenProps<Routes, "MyTab">;
function MyHeader({ route, navigation }: Props): React.JSX.Element {
  const { data: userProfile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyInfo,
  });
  const { tab, setTab, editable, setEditable, resetDeletion, resetEdit } = useEditStore();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.textFont}>{userProfile?.name}</Text>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={() => {
            setEditable(!editable);
            resetDeletion();
            }}>
            {editable ? (
              <View style={styles.unbutton}>
                <Text style={styles.unMenuTitle}>편집</Text>
              </View>
            ) : (
              <View style={styles.button}>
                <Text style={styles.menuTitle}>편집</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyMenu")}>
            <Image source={menu} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <GalleryProfile navigation={navigation} route={route} />
    </SafeAreaView>
  );
}

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#030303",
    paddingHorizontal: 20,
  },
  root: {
    height: 60,
    width: "100%",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuBar: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  menuTitle: {
    color: "white",
    fontWeight: "500",
    letterSpacing: -0.28,
    fontSize: 14,
  },
  unMenuTitle: {
    color: "black",
    fontWeight: "500",
    letterSpacing: -0.28,
    fontSize: 14,
  },
  button: {
    width: 70,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#424242",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  unbutton: {
    width: 70,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    width: 30,
    height: 20,
  },
  textFont: {
    color: "white",
    fontSize: 20,
  },
});
