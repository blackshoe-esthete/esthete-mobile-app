import {useDislikeComment, useLikeComment} from '@hooks/useExhibitionDetails';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';

type CommentProps = {
  commentId: string;
  userImg: string;
  userName: string;
  commentDate: string;
  commentText: string;
  isLiked: boolean;
  setModalVisible: (arg0: boolean) => void;
  exhibitionAuthorName?: string;
  currentUserName?: string;
};

const Comment = ({
  commentId,
  userImg,
  userName,
  commentDate,
  commentText,
  setModalVisible,
  isLiked,
  exhibitionAuthorName,
  currentUserName,
}: CommentProps) => {
  const navigation = useNavigation();
  const [onLike, setOnLike] = useState(isLiked);

  const {mutate: likeComment} = useLikeComment();
  const {mutate: dislikeComment} = useDislikeComment();

  const onLikePress = () => {
    if (currentUserName !== exhibitionAuthorName) {
      Alert.alert('전시회의 작가만 좋아요를 누를 수 있습니다.');
      return;
    }

    if (onLike) {
      dislikeComment(
        {commentId},
        {
          onSuccess: () => {
            setOnLike(false);
          },
          onError: error => {
            console.error('Error unliking the comment:', error);
          },
        },
      );
    } else {
      likeComment(
        {commentId},
        {
          onSuccess: () => {
            setOnLike(true);
          },
          onError: error => {
            console.error('Error liking the comment:', error);
          },
        },
      );
    }
  };

  const onReportPress = () => {
    setModalVisible(false);
    navigation.navigate('ExhibitionReport', {reportType: '댓글', commentId});
  };

  return (
    <View style={styles.container}>
      <Image source={userImg ? {uri: userImg} : require('src/assets/imgs/anonymous.png')} style={styles.profileIcon} />
      <View style={styles.commentSection}>
        <View style={styles.commentFlex}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.commentDate}>{commentDate}</Text>
        </View>
        <Text style={styles.commentText}>{commentText}</Text>
      </View>
      <TouchableOpacity onPress={onLikePress} style={styles.touchArea}>
        <Image
          source={onLike ? require('src/assets/icons/push-likes.png') : require('src/assets/icons/comment_like.png')}
        />
      </TouchableOpacity>
      {currentUserName === exhibitionAuthorName && (
        <TouchableOpacity onPress={onReportPress} style={styles.touchArea}>
          <Image source={require('src/assets/icons/siren.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  commentFlex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentSection: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    color: '#fff',
  },
  commentDate: {
    fontSize: 12,
    color: '#aaa',
  },
  commentText: {
    color: '#fff',
  },
  touchArea: {
    padding: 8,
  },
});

export default Comment;
