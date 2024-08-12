import { useEditStore } from "@store/edit-store";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageProps,
  Platform,
  TouchableOpacity,
} from "react-native";
import trash from "@assets/icons/trash.png";

type galleryProp = {
  exhibition_id: string;
  title: string;
  thumbnail_url: string;
  author?: string;
};
const { width } = Dimensions.get("window");
function GalleryItem(props: galleryProp): React.JSX.Element {
  const { tab, editable, setId, setDelete } = useEditStore();
  const onHandleDelete = (id: string) => {
    setId(id);
    setDelete(true);
  }

  return (
    <>
      {editable ? ( // 편집가능할때
        <View style={styles.photoBox}>
          <Image src={props.thumbnail_url} style={styles.photoIcon} />
          <TouchableOpacity onPress={()=>onHandleDelete(props.exhibition_id)} style={styles.trashContainer}>
            <Image source={trash} style={styles.trashIcon} />
          </TouchableOpacity>
          <View style={styles.titleBox}>
            <Text style={styles.textStyle}>{props.title}</Text>
            {props.author && (
              <Text style={styles.authorStyle}>{props.author}</Text>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.photoBox}>
          <Image src={props.thumbnail_url} style={styles.photoIcon} />
          <View style={styles.titleBox}>
            <Text style={styles.textStyle}>{props.title}</Text>
            {props.author && (
              <Text style={styles.authorStyle}>{props.author}</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
}

export default GalleryItem;

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
  trashContainer:{
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
    backgroundColor: "#29292966",
    zIndex: 1,
    width: "100%",
    height: 60,
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  authorStyle: {
    marginTop: 6,
    marginLeft: 10,
    color: "white",
    fontSize: 14,
    fontWeight: "400",
  },
});
