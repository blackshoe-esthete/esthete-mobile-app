import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { filterTags, preferTags } from "@utils/tags";

function ActivateKeyword({marginVertical, onValueChange}: any): React.JSX.Element {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const initial = Array(preferTags.length).fill(false);
  const [status, setStatus] = useState<boolean[]>(initial);

  type tagForm = {
    id: number;
    tag_id?: string;
    title: string;
  };
  type tagItemProps = {
    item: tagForm;
    status: boolean[];
    setStatus: React.Dispatch<React.SetStateAction<boolean[]>>;
  };

  const TagItem = ({ item, status, setStatus }: tagItemProps) => {
    const { id, title, tag_id } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTagId((prevTagId: string | null) =>
            prevTagId == tag_id ? null : tag_id || null
          );
        }}
      >
        {selectedTagId === tag_id ? (
          <View style={styles.focusedTagBox}>
            <Text style={styles.focusedTagTitle}>{title}</Text>
          </View>
        ) : (
          <View style={styles.tagBox}>
            <Text style={styles.tagTitle}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // if (selectedTagId !== null) {
    //   onValueChange([selectedTagId]);
    // } else {
    //   onValueChange([]);
    // }
    onValueChange(selectedTagId);
  }, [selectedTagId]);

  return (
    <View
      style={[
        styles.keywordContainer,
        { marginVertical: marginVertical },
      ]}
    >
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gap10}
        data={preferTags}
        renderItem={({ item, index }) => (
          <TagItem
            key={index}
            item={item}
            status={status}
            setStatus={setStatus}
          />
        )}
      />
    </View>
  );
}

export default ActivateKeyword;

const styles = StyleSheet.create({
  keywordContainer: {
    flexDirection: "row",
    gap: 9,
    // marginVertical: 30,
  },
  keyword: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: "#414141",
  },
  keywordText: {
    color: "#F4F4F4",
    fontSize: 16,
  },
  gap10: {
    gap: 10,
  },
  tagTitle: {
    color: "#F4F4F4",
    fontSize: 16,
    fontWeight: "500",
  },
  focusedTagTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  tagBox: {
    borderRadius: 10,
    backgroundColor: "#414141",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  focusedTagBox: {
    borderRadius: 10,
    backgroundColor: "#FFD600",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
});
