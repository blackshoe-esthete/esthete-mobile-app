import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

const CommentInputBox = () => {
  const [text, setText] = useState('');

  const onSend = () => {
    if (text) {
      console.log(text);
      Keyboard.dismiss();
      setText('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="(전시회명)에 대한 리뷰 남기기"
          style={styles.input}
        />
        <TouchableOpacity onPress={onSend} style={styles.sendBbutton}>
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
  sendBbutton: {
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
