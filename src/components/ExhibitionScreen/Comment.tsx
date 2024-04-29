import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type CommentProps = {
  userImg: string;
  userName: string;
  commentDate: string;
  commentText: string;
};

const Comment = ({
  userImg,
  userName,
  commentDate,
  commentText,
}: CommentProps) => {
  const navigation = useNavigation();
  const [onLike, setOnLike] = useState(false);

  console.log(userImg);

  const onLikePress = () => {
    setOnLike(!onLike);
  };

  const onNotificationPress = () => {
    navigation.navigate('ExhibitionReport');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('src/assets/imgs/anonymous.png')}
        style={styles.profileIcon}
      />
      <View style={styles.commentSection}>
        <View style={styles.commentFlex}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.commentDate}>{commentDate}</Text>
        </View>
        <Text style={styles.commentText}>{commentText}</Text>
      </View>
      <TouchableOpacity onPress={onLikePress} style={styles.touchArea}>
        <Image
          source={
            onLike
              ? require('src/assets/icons/push-likes.png')
              : require('src/assets/icons/comment_like.png')
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationPress} style={styles.touchArea}>
        <Image source={require('src/assets/icons/siren.png')} />
      </TouchableOpacity>
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
