import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import unlike from '@assets/icons/unlike.png';
import like from '@assets/icons/like.png';

type titleProp = {
  title?: string;
  likeCount?: number;
  isLike?: boolean;
}

function FilterTitle({title, likeCount, isLike}: titleProp) : React.JSX.Element {
  const [liked, setLiked] = useState(isLike); // 사용자의 상태 받아오기

  // const changeLike = () => {
  //   setLiked(!liked);
  // };
  return(
    <>
    <View style={styles.titleBox}>
          <View style={styles.textRoundBox}>
            <Text style={styles.textStyle}>{title}</Text>
          </View>
          <View style={styles.likeBox}>
            <TouchableOpacity onPress={()=>setLiked(!liked)}>
              {liked ? (
                <Image source={like} />
              ) : (
                <Image source={unlike} />
              )}
            </TouchableOpacity>
            <Text style={{color: 'white'}}>{likeCount}</Text>
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