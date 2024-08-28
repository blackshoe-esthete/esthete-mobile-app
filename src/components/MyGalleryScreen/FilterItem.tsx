import { useEditStore } from "@store/edit-store";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import trash from "@assets/icons/trash.png";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "@screens/Routes";

type filterProp<T extends keyof Routes> = {
  filter_id: string;
  filter_name: string;
  filter_thumbnail_url: string;
  navigation: NativeStackScreenProps<Routes, T>;
  route: RouteProp<Routes, T>;
};

const { width } = Dimensions.get("window");

function FilterItem<T extends keyof Routes>(props: filterProp<T>): React.JSX.Element {
  const { tab, editable, setId, setDelete } = useEditStore();
  const onHandleDelete = (id: string) => {
    setId(id);
    setDelete(true);
  };
  const navigation = useNavigation();
  return (
    <>
      {editable ? (
        <View style={styles.photoBox}>
          <Image src={props.filter_thumbnail_url} style={styles.photoIcon} />
          <TouchableOpacity
            onPress={() => onHandleDelete(props.filter_id)}
            style={styles.trashContainer}
          >
            <Image source={trash} style={styles.trashIcon} />
          </TouchableOpacity>
          <ImageBackground style={styles.titleBox} borderRadius={4}>
            <Text style={styles.textStyle}>{props.filter_name}</Text>
          </ImageBackground>
        </View>
      ) : (
        <TouchableOpacity onPress={() => (props.navigation as any).navigate('FilterIndexScreen', {filterId: props.filter_id})}>
          <View style={styles.photoBox}>
            <Image src={props.filter_thumbnail_url} style={styles.photoIcon} />
            <ImageBackground style={styles.titleBox} borderRadius={4}>
              <Text style={styles.textStyle}>{props.filter_name}</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
}

export default FilterItem;

const styles = StyleSheet.create({
  photoBox: {
    width: width,
    height: 180,
    marginBottom: 20,
    position: "relative",
  },
  photoIcon: {
    width: "100%",
    resizeMode: "stretch",
    height: "100%",
  },
  trashContainer: {
    position: "absolute",
    top: 15,
    right: 50,
  },
  trashIcon: {
    width: 20,
    height: 25,
    zIndex: 3,
    backgroundColor: "transparent",
    ...Platform.select({
      // ios: {
      //   shadowColor: "#000",
      //   shadowOffset: { width: 0, height: 4 },
      //   shadowOpacity: 0.25,
      //   shadowRadius: 4,
      // },
      android: {
        elevation: 5,
      },
    }),
  },
  titleBox: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0000004D",
    zIndex: 1,
    width: "100%",
    height: 50,
    // blurRadius: 4,
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
