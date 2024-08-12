import React from 'react';
import { FlatList, Image, ImageStyle, StyleProp, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '#types/navigations';
import { ImageSourcePropType } from 'react-native';
import { AuthorResponse, ExhibitionListResponse } from '#types/mainExhibitionService.type';
import CustomSkeletonPlaceholder from './SkeletonPlaceholder';

type HorizontalListProps = {
  imgStyles: StyleProp<ImageStyle>;
  title: string;
  data: ExhibitionListResponse[] | AuthorResponse[];
  idKey: 'exhibition_id' | 'user_id';
  urlKey: 'thumbnail_url' | 'profile_url';
  isFetching?: boolean;
  imgSource?: ImageSourcePropType;
  children?: React.ReactNode;
};

function HorizontalList({
  imgStyles,
  title,
  data,
  idKey,
  urlKey,
  isFetching,
  imgSource,
  children,
}: HorizontalListProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (id: string) => {
    // idKey에 따라 다르게 동작할 수 있도록 여기서 분기할 수 있어
    if (idKey === 'exhibition_id') {
      navigation.navigate('Exhibition', { id });
    } else if (idKey === 'user_id') {
      // 유저 갤러리 디자인이 완성되면 할 예정
      // navigation.navigate('스크린이름', {id});
    }
  };

  const renderItem = ({ item, index }: { item: ExhibitionListResponse | AuthorResponse; index: number }) => (
    <TouchableOpacity
      onPress={() => handlePress(item[idKey as keyof typeof item])}
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <Image
        style={[imgStyles, index === 0 && { marginLeft: 20 }, index === data.length - 1 && { marginRight: 20 }]}
        source={item[urlKey as keyof typeof item] ? { uri: item[urlKey as keyof typeof item] } : imgSource}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.gap10}>
      {children ? children : <Text style={styles.text}>{title}</Text>}
      {isFetching ? (
        <CustomSkeletonPlaceholder type={idKey === 'exhibition_id' ? 'exhibition' : 'user'} />
      ) : data?.length === 0 ? (
        <View style={styles.emptyTextWrapper}>
          <Text style={styles.emptyText}>결과가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gap10}
          data={data}
          renderItem={renderItem}
        />
      )}
    </View>
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
  emptyTextWrapper: {
    flex: 1,
    paddingVertical: 60,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  gap10: {
    gap: 10,
  },
});
