import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import  cancel from '@assets/icons/cancel_gray.png';

function Preferred() {
  type tagForm = {
    id: number;
    title: string;
  };
  const tags: tagForm[] = [
    {id: 0, title: '자연스러운'},
    {id: 1, title: '클래식한'},
    {id: 2, title: '쾌활한'},
    {id: 3, title: '세련된'},
    {id: 4, title: '우아한'},
    {id: 5, title: '잔잔한'},
    {id: 6, title: '풍요로운'},
    {id: 7, title: '차가운'},
    {id: 8, title: '평화로운'},
    {id: 9, title: '짙은'},
    {id: 10, title: '빈티지한'},
    {id: 11, title: '화사한'},
    {id: 12, title: '모던한'},
    {id: 13, title: '수수한'},
    {id: 14, title: '부드러운'},
    {id: 15, title: '사랑스러운'},
    {id: 16, title: '캐쥬얼한'},
    {id: 17, title: '자유분방한'},
    {id: 18, title: '다채로운'},
    {id: 19, title: '차분한'},
    {id: 20, title: '신비로운'},
    {id: 21, title: '순수한'},
    {id: 22, title: '고요한'},
    {id: 23, title: '고급스러운'},
  ];

  const initial = Array(tags.length).fill(false);
  const [status, setStatus] = useState<boolean[]>(initial);
  const [filter, setFilter] = useState<tagForm[]>([]);

  const TagForm = (prop: tagForm) => {
    const {id, title} = prop;
    return (
      <TouchableOpacity
        onPress={() => {
          const newStatus = [...status];
          newStatus[id] = !newStatus[id];
          setStatus(newStatus);
        }}>
        {status[id] ? (
          <View style={styles.focusedTagBox}>
            <Text style={styles.focusedTagTitle}>{title}</Text>
          </View>
        ) : (
          <View style={styles.tagBox}>
            <Text style={styles.tagTitle}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const SelectedTag = (prop: tagForm) => {
    const {id, title} = prop;
    return (
      <View style={styles.selectedTag}>
        <Text style={styles.tagTitle}>{title}</Text>
        <TouchableOpacity onPress={() => {
          const newStatus = [...status];
          newStatus[id] = !newStatus[id];
          setStatus(newStatus);
        }}>
          <Image source={cancel} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(()=>{
    const newFilteredTags = tags.filter((item) => status[item.id] === true);
    setFilter(newFilteredTags);
  }, [status]);

  return (
    <View style={styles.container}>
      <Text style={styles.intro}>
        선호하는 태그를 10개 선택해주세요 (최대 10개)
      </Text>
      <View style={styles.tagContainer}>
        {tags.map((item, index) => (
          <TagForm key={index} id={item.id} title={item.title} />
        ))}
      </View>
      <Text style={[styles.intro, {marginTop: 50}]}>내가 선택한 태그</Text>
      <View style={styles.tagContainer}>
        {filter && filter.map((item, index) => (
          <SelectedTag key={index} id={item.id} title={item.title} />
        ))}
      </View>
      <TouchableOpacity style={{marginTop: 160}}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>저장하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Preferred;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    marginBottom: 60
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
    alignItems: 'center',
    width: 'auto',
  },
  focusedTagBox: {
    borderRadius: 10,
    backgroundColor: '#FFD600',
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  tagTitle: {
    color: '#F4F4F4',
    fontSize: 16,
    fontWeight: '500',
  },
  focusedTagTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  selectedTag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    paddingLeft: 15,
    paddingRight: 11,
    backgroundColor: '#414141',
    padding: 15,
    borderRadius: 10,
    gap: 5
  },
  icon: {
    width: 18,
    height: 18,
  },
  button: {
    backgroundColor: '#FFD600',
    borderRadius: 10,
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: '#030303',
    fontSize: 18,
    letterSpacing: -0.36,
    fontWeight: '700'
  }
});
