import React from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

type HorizontalListProps = {
  imgStyles: StyleProp<ImageStyle>;
  title: string;
  data: number[] | String[];
  imgSource: File | Blob | string;
  children?: React.ReactNode;
};

function UsedPicture(HorizontalListProps: any): React.JSX.Element {
  const {imgStyles, title, data, imgSource, children} = HorizontalListProps; 
  return (
    <>
      <View style={styles.gap10}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={data}
          renderItem={({index}) => (
            <Image
              style={[
                imgStyles,
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

export default UsedPicture;

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