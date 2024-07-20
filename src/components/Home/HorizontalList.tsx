import React from 'react';
import {FlatList, Image, ImageStyle, StyleProp, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import {ImageSourcePropType} from 'react-native';

type HorizontalListProps = {
  imgStyles: StyleProp<ImageStyle>;
  title: string;
  data: any[];
  idKey: 'exhibition_id' | 'user_id';
  urlKey: 'thumbnail_url' | 'profile_url';
  imgSource?: ImageSourcePropType;
  children?: React.ReactNode;
};

function HorizontalList({
  imgStyles,
  title,
  data,
  idKey,
  urlKey,
  imgSource,
  children,
}: HorizontalListProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (id: string) => {
    // idKey에 따라 다르게 동작할 수 있도록 여기서 분기할 수 있어
    if (idKey === 'exhibition_id') {
      navigation.navigate('Exhibition', {id});
    } else if (idKey === 'user_id') {
      // 유저 갤러리 디자인이 완성되면 할 예정
      // navigation.navigate('스크린이름', {id});
    }
  };

  return (
    <>
      <View style={styles.gap10}>
        {children ? children : <Text style={styles.text}>{title}</Text>}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={data}
          renderItem={({item, index}: {item: any; index: number}) => (
            <TouchableOpacity
              onPress={() => handlePress(item[idKey])}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              {item[urlKey] ? (
                <Image
                  style={[imgStyles, index === 0 && {marginLeft: 20}, index === data.length - 1 && {marginRight: 20}]}
                  source={{uri: item[urlKey]}}
                />
              ) : (
                <Image
                  style={[imgStyles, index === 0 && {marginLeft: 20}, index === data.length - 1 && {marginRight: 20}]}
                  source={imgSource}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

export default HorizontalList;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 20,
  },
  gap10: {
    gap: 10,
  },
});
