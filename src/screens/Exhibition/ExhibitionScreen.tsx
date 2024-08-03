import React, {useRef, useState, useCallback} from 'react';
import {View, Button, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import {RootStackParamList} from '../../types/navigations';
import Carousel from 'react-native-reanimated-carousel';
import {interpolate, Extrapolate} from 'react-native-reanimated';
import {useQuery} from '@tanstack/react-query';
import {searchExhibition} from 'src/apis/mainExhibitionService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {shuffleArray} from 'src/utils/random';

type ExhibitionScreenRouteProp = RouteProp<RootStackParamList, 'Exhibition'>;

interface Exhibition {
  exhibition_id: string;
  // 필요한 다른 필드들을 여기에 추가합니다.
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ExhibitionScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ExhibitionScreenRouteProp>();
  const {id} = route.params;

  const [isPlaying, setIsPlaying] = useState(false);
  const cubeRef = useRef<any>(null);

  const {data: searchResult, isLoading: isSearchLoading} = useQuery({
    queryKey: ['searchExhibition', ''],
    queryFn: () => searchExhibition(''),
    select: data => data?.content,
  });

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const animationStyle = useCallback(
    (value: number) => {
      'worklet';
      const zIndex = interpolate(value, [-1, 0, 1], [-1200, 0, -1200]);
      const rotateY = `${interpolate(value, [-1, 0, 1], [-90, 0, 90], Extrapolate.CLAMP)}deg`;
      const perspective = 1000;
      const transform = {
        transform: [{perspective}, {rotateY}, {translateX: value * SCREEN_WIDTH}],
      };
      return {
        ...transform,
        zIndex,
      };
    },
    [SCREEN_WIDTH],
  );

  if (isSearchLoading || !searchResult) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  let exhibitionIds: string[] = searchResult?.map((exhibition: Exhibition) => exhibition.exhibition_id) || [];
  exhibitionIds = shuffleArray(exhibitionIds);

  const currentIndex = exhibitionIds.indexOf(id);
  if (currentIndex > -1) {
    exhibitionIds.splice(currentIndex, 1);
    exhibitionIds.unshift(id);
  }

  return (
    <View>
      <Carousel
        ref={cubeRef}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        autoPlay={isPlaying}
        autoPlayInterval={3000}
        data={exhibitionIds}
        scrollAnimationDuration={2000}
        customAnimation={animationStyle}
        renderItem={({item}) => {
          const currentExhibitionData = searchResult.find(
            (exhibition: Exhibition) => exhibition.exhibition_id === item,
          );

          return (
            <View key={item} style={styles.container}>
              <View style={styles.contentContainer}>
                <View style={styles.mainPicture}>
                  <ExhibitionMainPicture
                    exhibitionData={currentExhibitionData}
                    entered={false}
                    handlePlayPause={handlePlayPause}
                    isPlaying={isPlaying}
                    currentExhibitionIndex={item}
                  />
                  <ExhibitionPictureList isVisited={false} exhibitionData={currentExhibitionData} id={item} />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title="Visit"
                  color="#000"
                  onPress={() => {
                    setIsPlaying(false);
                    navigation.navigate('ExhibitionEntered', {exhibitionData: currentExhibitionData, id: item});
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ExhibitionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
    paddingTop: 55,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainPicture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  pictures: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -30}],
    width: 70,
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#FFD600',
    shadowColor: '#FFD600',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    fontSize: 18,
  },
});
