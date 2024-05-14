import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Preferred() {
  const tags: string[] = [
    '자연스러운',
    '클래식한',
    '쾌활한',
    '세련된',
    '우아한',
    '잔잔한',
    '풍요로운',
    '차가운',
    '평화로운',
    '짙은',
    '빈티지한',
    '화사한',
    '모던한',
    '수수한',
    '부드러운',
    '사랑스러운',
    '캐쥬얼한',
    '자유분방한',
    '다채로운',
    '차분한',
    '신비로운',
    '순수한',
    '고요한',
    '고급스러운',
  ];

  type tag = {
    title: string;
  };
  const TagForm = (prop: tag) => {
    return (
      <View style={styles.tagBox}>
        <Text style={styles.tagTitle}>{prop.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        선호하는 태그를 10개 선택해주세요 (최대 10개)
      </Text>
      {tags.map((item, index) => 
        <View>
          {/* {(item: any) => <TagForm {...item}/>} */}
        </View>
      )}
    </View>
  );
}

export default Preferred;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  intro: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.32,
  },
  tagBox: {
    borderRadius: 10,
    backgroundColor: '#414141',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagTitle: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '500'
  }
});
