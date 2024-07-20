import {usePostComment} from '@hooks/useExhibitionDetails';
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Alert} from 'react-native';

interface CommentInputBoxProps {
  exhibitionId: string;
  authorName?: string;
  currentUserName: string;
}

const CommentInputBox = ({exhibitionId, authorName, currentUserName}: CommentInputBoxProps) => {
  const [commentText, setCommentText] = useState('');
  const {mutate: postComment} = usePostComment();

  const handlePostComment = () => {
    if (authorName === currentUserName) {
      Alert.alert('본인 게시물에는 감상평을 달 수 없습니다.');
      setCommentText('');
      return;
    }
    if (commentText.trim().length > 0) {
      postComment(
        {exhibitionId, content: commentText},
        {
          onSuccess: () => {
            setCommentText('');
            Alert.alert('댓글이 등록되었습니다.');
          },
          onError: error => {
            console.error('댓글 등록 실패:', error);
            Alert.alert('댓글 등록 중 오류가 발생했습니다.');
          },
        },
      );
    } else {
      Alert.alert('댓글 내용을 입력해주세요.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="전시회에 대한 리뷰 남기기"
          style={styles.input}
        />
        <TouchableOpacity onPress={handlePostComment} style={styles.sendButton}>
          <Text style={styles.buttonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    width: 400,
    height: 50,
    backgroundColor: '#292929',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'white',
  },
  sendButton: {
    position: 'absolute',
    right: 30,
    top: '35%',
    width: 50,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#646464',
    color: '#ffffff',
    fontSize: 13,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default CommentInputBox;
