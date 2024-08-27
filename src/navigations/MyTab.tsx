import MyHeader from "@components/MyGalleryScreen/MyHeader";
import MyCollections from "@screens/MyGallery/MyCollections";
import MyFilter from "@screens/MyGallery/MyFilter";
import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Routes } from "@screens/Routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mineExhibition, mineFilter } from "src/apis/mygallery";
import { useEditStore } from "@store/edit-store";
import CommonModal from "@components/common/CommonModal";
import { useFocusEffect } from "@react-navigation/native";
import { deleteItem } from "src/apis/filterService";

type Props = NativeStackScreenProps<Routes, "MyTab">;

function MyTab({ navigation, route }: Props): React.JSX.Element {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('전시');
  const [modalVisible, setModalVisible] = useState(false);
  const { tab, setTab, editable, setEditable, deletable, resetDeletion, resetEdit, id } = useEditStore();
  const [routes] = useState([
    { key: "first", title: "전시", name: "exhibition" },
    { key: "second", title: "필터", name: "filter" },
  ]);

  const { data: galleryData } = useQuery({
    queryKey: ["my-gallery"],
    queryFn: mineExhibition,
  });

  const { data: filterData } = useQuery({
    queryKey: ["my-filter"],
    queryFn: mineFilter,
  });

  const renderScene = SceneMap({
    first: () => <MyCollections props={galleryData} temporary={false} />,
    second: () => <MyFilter props={filterData} temporary={false} navigation={navigation}/>,
  });

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    const activeTabName = routes[newIndex].name;
    const activeTab = routes[newIndex].title;
    setTab(activeTabName);
    setTitle(activeTab);
  };

  useEffect(() => {
    if (deletable) {
      setModalVisible(true);
    }
  }, [deletable]);
  

  const modalShown = () => {
    setModalVisible(!modalVisible);
    resetDeletion();
  };

  const subTitleText = `
  ${title}를 삭제하시겠습니까?

  삭제를 완료하면 관련된 정보가 모두 사라지며 
  복구가 불가능합니다.
`;
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: () => {
      if(id && tab){
       return deleteItem({title: tab, id: id})
      }
      return Promise.reject(new Error("ID 또는 Tab이 유효하지 않습니다."));
    },
    onSuccess(data){
      resetDeletion()
      queryClient.invalidateQueries({queryKey: ["my-filter"]});
      queryClient.invalidateQueries({queryKey: ["my-gallery"]})
    },
    onError(data) {
      console.log(data)
    }
  })

  const customProps = {
    title: `${title}를 삭제하시겠습니까?`,
    subTitle: subTitleText,
    visible: modalVisible,
    onClose: modalShown,
    button: ["삭제하기", "닫기"],
    onConfirm: () => mutationDelete.mutate()
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) =>
        focused ? (
          <Text style={{ color: "#FFD600", margin: 8 }}>{route.title}</Text>
        ) : (
          <Text style={{ color: "white", margin: 8 }}>{route.title}</Text>
        )
      }
      indicatorStyle={{ backgroundColor: "#FFD600" }}
      style={{ backgroundColor: "#030303" }}
    />
  );

  useEffect(() => {
    console.log(deletable);
  }, [deletable])

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetDeletion();
        resetEdit();
      };
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader navigation={navigation} route={route} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        style={styles.container}
      />
      {deletable && <CommonModal {...customProps} /> }
    </SafeAreaView>
  );
}

export default MyTab;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginTop: 0,
    marginHorizontal: 20,
  },
});
