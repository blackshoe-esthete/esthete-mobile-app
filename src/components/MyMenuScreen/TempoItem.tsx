import CommonModal from '@components/common/CommonModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TemporaryFilter } from '#types/filterService.type';
import { RootStackParamList } from '#types/navigations';
import { formatDate } from '@utils/format';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {
  Sharpen,
  ColorMatrix,
  concatColorMatrices,
  brightness as exposure,
  contrast,
  saturate,
  hueRotate,
  temperature,
  grayscale,
} from 'react-native-image-filter-kit';
import { brightness } from '@utils/filter';
import { deleteTemporaryFilter } from 'src/apis/filterService';
import { InvalidateQueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { filterServiceToken } from '@utils/dummy';

type galleryProp = {
  temporary_exhibition_id: string;
  title?: string;
  thumbnail_url: string;
  author?: string;
  date?: string;
  label?: string;
};
type filterProp = TemporaryFilter & {
  label?: string;
};

const { width } = Dimensions.get('window');

const subTitleText = `
    임시저장한 전시를 삭제하시겠습니까?

    삭제를 완료하면 관련된 정보도 모두 사라지며
    복구가 불가능합니다.
`;

function TempoItem(props: galleryProp | filterProp): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const { mutate } = useMutation({
    mutationFn: () => deleteTemporaryFilter((props as filterProp).temporary_filter_id, filterServiceToken),
    onSuccess: () => {
      setDeleteModalVisible(!deleteModalVisible);
      Alert.alert('삭제가 완료되었습니다.');
      queryClient.invalidateQueries({ 'temp-filter': true } as InvalidateQueryFilters);
    },
  });

  const deleteTempFilter = () => {
    mutate();
  };

  const deleteProps = {
    title: '임시저장본을 삭제하시겠습니까?',
    subTitle: subTitleText,
    visible: deleteModalVisible,
    onConfirm: deleteTempFilter,
    onClose: () => setDeleteModalVisible(!deleteModalVisible),
    button: ['삭제하기', '닫기'],
  };

  const navigateScreen = (title: string) => {
    if (title == 'collection') {
      navigation.navigate('ExhibitionCreation');
    } else {
      navigation.navigate('FilterCreation', props as filterProp);
    }
  };

  const thumbnailImage = () => {
    if (props.label == 'collection') {
      return <Image src={(props as galleryProp).thumbnail_url} style={styles.photoIcon} />;
    } else if (props.label == 'filter') {
      return (
        <Sharpen
          image={
            <ColorMatrix
              matrix={concatColorMatrices([
                exposure((props as filterProp).filter_attributes.exposure),
                brightness((props as filterProp).filter_attributes.brightness),
                contrast((props as filterProp).filter_attributes.contrast),
                saturate((props as filterProp).filter_attributes.saturation),
                hueRotate((props as filterProp).filter_attributes.hue),
                temperature((props as filterProp).filter_attributes.temperature),
                grayscale((props as filterProp).filter_attributes.gray_scale),
              ])}
              style={styles.photoIcon}
              image={<Image src={(props as filterProp).filter_thumbnail} style={styles.photoIcon} />}
            />
          }
          style={styles.photoIcon}
          amount={(props as filterProp).filter_attributes.sharpness}
          extractImageEnabled={true}
        />
      );
    }
    return null;
  };

  const resume = () => {
    if (props.label == 'collection') {
      return <Text style={styles.textStyle}>{formatDate((props as galleryProp).date!)} 임시저장</Text>;
    } else if (props.label == 'filter') {
      return <Text style={styles.textStyle}>{formatDate((props as filterProp).updated_at)} 임시저장</Text>;
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.photoBox}>
        {thumbnailImage()}
        <View style={styles.titleBox}>{resume()}</View>
      </View>
      <View style={styles.buttonLayer}>
        <TouchableOpacity style={styles.buttonLeftBox} onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>삭제하기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRightBox} onPress={() => navigateScreen(props.label || 'collection')}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>편집하기</Text>
          </View>
        </TouchableOpacity>
        <CommonModal {...deleteProps} />
      </View>
    </View>
  );
}

export default TempoItem;

const styles = StyleSheet.create({
  photoBox: {
    width: width,
    height: 180,
  },
  photoIcon: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },
  titleBox: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(41, 41, 41, 0.40)',
    zIndex: 1,
    width: '100%',
    height: 60,
  },
  textStyle: {
    marginTop: 21,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  authorStyle: {
    marginTop: 6,
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  buttonLayer: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    marginBottom: 20,
  },
  buttonLeftBox: {
    backgroundColor: '#171717',
    borderTopColor: '#292929',
    borderBottomColor: '#292929',
    borderLeftColor: '#292929',
    borderWidth: 1,
    width: '50%',
  },
  buttonRightBox: {
    backgroundColor: '#171717',
    borderColor: '#292929',
    borderWidth: 1,
    width: '50%',
  },
  buttonContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#E9E9E9',
    fontSize: 16,
    fontWeight: '400',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
