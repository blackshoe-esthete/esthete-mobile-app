import React from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type HorizontalListProps = {
  imgStyles: StyleProp<ImageStyle>;
  title: string;
  data: number[] | String[];
  imgSource: File | Blob | string;
  children?: React.ReactNode;
};

function HorizontalList({
  imgStyles,
  title,
  data,
  imgSource,
  children,
}: HorizontalListProps): React.JSX.Element {
  return (
    <>
      <View style={styles.gap10}>
        {children ? children : <Text style={styles.text}>{title}</Text>}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={data}
          renderItem={({index}) => (
            <Image
              style={[
                imgStyles,
                index === 0 && {marginLeft: 20},
                index === data.length - 1 && {marginRight: 20},
              ]}
              source={imgSource}
            />
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
