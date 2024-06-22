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
  imgSource?: ImageSourcePropType;
  children?: React.ReactNode;
};

function HorizontalList({imgStyles, title, data, imgSource, children}: HorizontalListProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToExhibition = (id: string) => {
    navigation.navigate('Exhibition', {id});
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
              onPress={() => navigation.navigate('Exhibitions')}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              {imgSource && (
                <Image
                  style={[imgStyles, index === 0 && {marginLeft: 20}, index === data.length - 1 && {marginRight: 20}]}
                  source={imgSource}
                />
              )}
              {item.thumbnail_url && (
                <Image
                  style={[imgStyles, index === 0 && {marginLeft: 20}, index === data.length - 1 && {marginRight: 20}]}
                  source={{uri: item.thumbnail_url}}
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
