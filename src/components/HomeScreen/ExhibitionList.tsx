import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import exampleImg from '@assets/imgs/ex1.png';
import anonymousImg from '@assets/imgs/anonymous.png';
import arrowIcon from '@assets/icons/arrow.png';

function ExhibitionList(): React.JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.exhibitionContainer}>
      <View style={styles.gap10}>
        <Text style={styles.text}>당신을 위한 추천!</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => (
            <Image style={styles.exhibitionImg} source={exampleImg} />
          )}
        />
      </View>
      <View style={styles.gap10}>
        <Text style={styles.text}>이런 전시실은 어떠세요?</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => (
            <Image style={styles.exhibitionImg} source={exampleImg} />
          )}
        />
      </View>
      <View style={styles.gap10}>
        <Text style={styles.text}>선호 작가</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => (
            <Image style={styles.personImg} source={anonymousImg} />
          )}
        />
      </View>
      <View style={styles.gap10}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.text}>내 주변</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.text,
                {color: '#D6D6D6', fontSize: 12, fontWeight: '400'},
              ]}>
              지도 보기
              <Image
                source={arrowIcon}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </Text>
          </View>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.gap10, {paddingBottom: 70}]}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={() => (
            <Image style={styles.exhibitionImg} source={exampleImg} />
          )}
        />
      </View>
    </ScrollView>
  );
}

export default ExhibitionList;

const styles = StyleSheet.create({
  exhibitionContainer: {
    gap: 50,
  },
  personImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  exhibitionImg: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  arrowIcon: {
    width: 4.5,
    height: 10,
    marginLeft: 10,
    marginRight: 10.5,
  },
  gap10: {
    gap: 10,
  },
});
