import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import unlike from '@assets/icons/unlike.png';
import like from '@assets/icons/like.png';
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikeToFilter, pushLikeToFilter } from "src/apis/filterService";

type titleProp = {
  title?: string;
  likeCount?: number;
  isLike?: boolean;
  filterId: string;
}

function FilterTitle({title, likeCount, isLike, filterId}: titleProp) : React.JSX.Element {
  const [liked, setLiked] = useState(isLike); // 사용자의 상태 받아오기
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount || 0);
  const queryClient = useQueryClient();

  const changeLike = async () => {
    if(!liked) { //좋아요 누르게 되면
      return await pushLikeToFilter(filterId);
    }else{ //좋아요 취소하면
      return await deleteLikeToFilter(filterId);
    }
  };

  const mutationFilterLike = useMutation({
    mutationFn: changeLike,
    onSuccess: (data) => {
      console.log(data);
      setLiked(!liked);
      setCurrentLikeCount((prevCount) => liked ? prevCount - 1 : prevCount + 1);
      queryClient.invalidateQueries({ queryKey: ['filter-single', filterId] });
      queryClient.invalidateQueries({ queryKey: ['filter-searched']});
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return(
    <>
    <View style={styles.titleBox}>
          <View style={styles.textRoundBox}>
            <Text style={styles.textStyle}>{title}</Text>
          </View>
          <View style={styles.likeBox}>
            <TouchableOpacity onPress={()=>mutationFilterLike.mutate()}>
              {liked ? (
                <Image source={like} />
              ) : (
                <Image source={unlike} />
              )}
            </TouchableOpacity>
            <Text style={{color: 'white'}}>{currentLikeCount}</Text>
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