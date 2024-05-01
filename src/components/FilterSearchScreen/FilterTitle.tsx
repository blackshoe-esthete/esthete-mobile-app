import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import unlike from '@assets/icons/unlike.png';
import like from '@assets/icons/like.png';

function FilterTitle() : React.JSX.Element {
  const [liked, setLiked] = useState(false); // 사용자의 상태 받아오기

  const changeLike = () => {
    setLiked(!liked);
  };
  return(
    <>
    <View style={styles.titleBox}>
          <View style={styles.textRoundBox}>
            <Text style={styles.textStyle}>Filter Title</Text>
          </View>
          <View style={styles.likeBox}>
            <TouchableOpacity onPress={()=>setLiked(!liked)}>
              {liked ? (
                <Image source={like} />
              ) : (
                <Image source={unlike} />
              )}
            </TouchableOpacity>
            <Text style={{color: 'white'}}>12K</Text>
          </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 30,
    // backgroundColor: 'white'
  },
  textRoundBox: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    height: 29,
  },
  textStyle: {
    fontSize: 22,
    fontFamily: 'bold',
    color: '#FFFFFF',
    // borderBottomWidth: 1,
  },
  likeBox: {
    alignItems: 'center',
  },
});


export default FilterTitle;