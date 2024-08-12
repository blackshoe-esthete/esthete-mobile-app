import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

function GoOutList() {
  const [id, setId] = useState<number>();
  const list = [
    { id: 0, title: "서비스 이용 대상이 아님" },
    { id: 1, title: "서비스 이용이 복잡하고 어려움" },
    { id: 2, title: "서비스의 장애와 오류 때문에" },
    { id: 3, title: "환불 후 이용의사가 없어져서" },
    { id: 4, title: "탈퇴 후 신규가입하기 위함" },
    { id: 5, title: "기타" },
  ];

  return (
    <View style={style.container}>
      <View style={style.headerBox}>
        <Text style={style.headerText}>탈퇴 사유를 알려주세요</Text>
      </View>
      {list.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setId(item.id)}>
          {index == id ? (
            <View style={style.selectedButtonBox}>
              <Text style={style.selectedButtonTitle}>{item.title}</Text>
            </View>
          ) : (
            <View style={style.buttonBox}>
              <Text style={style.buttonTitle}>{item.title}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <TextInput
        style={[
          style.inputBox,
          id == 5 ? { display: "flex" } : { display: "none" },
        ]}
        maxLength={50}
      />
    </View>
  );
}

export default GoOutList;

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "100%",
  },
  headerBox: {
    height: 66,
    display: "flex",
    justifyContent: "center",
    borderBottomColor: "#292929",
    borderWidth: 0.8,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.32,
  },
  buttonBox: {
    height: 68,
    justifyContent: "center",
    borderBottomColor: "#292929",
    borderWidth: 0.8,
    paddingHorizontal: 10

  },
  selectedButtonBox: {
    backgroundColor: 'gray',
    height: 68,
    justifyContent: "center",
    borderBottomColor: "#292929",
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.36,
  },
  selectedButtonTitle:{
    color: 'white',
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.36,
  },
  inputBox: {
    height: 68,
    backgroundColor: "#292929",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});
