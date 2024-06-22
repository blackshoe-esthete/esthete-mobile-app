import React, {useRef, useState} from 'react';
import {View, Button, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import {RootStackParamList} from '../../types/navigations';
import Carousel from 'react-native-reanimated-carousel';
import {interpolate, Extrapolate} from 'react-native-reanimated';
import {useExhibitionDetails} from '../../hooks/useExhibitionDetails';
type ExhibitionScreenRouteProp = RouteProp<RootStackParamList, 'Exhibition'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ExhibitionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExhibitionScreenRouteProp>();
  const {id} = route.params;

  const exhibitionQuery = useExhibitionDetails(id);

  const {data} = exhibitionQuery;
  console.log('data', data);

  const goToExhibitionEntered = (id: string) => {
    navigation.navigate('ExhibitionEntered', {id});
  };

  const goToExhibition = (id: string) => {
    navigation.navigate('Exhibition', {id});
  };

  const cubeRef = useRef<any>(null);
  const exhibitionIds = ['123', '456', '789'];

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  const animationStyle: any = React.useCallback(
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
    [SCREEN_WIDTH, SCREEN_HEIGHT],
  );

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
        renderItem={({item, index}) => (
          <View key={index} style={styles.container}>
            <View style={styles.contentContainer}>
              <View style={styles.mainPicture}>
                <ExhibitionMainPicture
                  title={data.title}
                  date={data.date}
                  author={data.author}
                  authorProfile={data.author_profile_url}
                  thumbnail={data.thumbnail_url}
                  entered={false}
                  handlePlayPause={handlePlayPause}
                  isPlaying={isPlaying}
                  currentExhibitionIndex={item}
                />
                <ExhibitionPictureList isVisited={false} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Visit"
                color="#000"
                onPress={() => {
                  setIsPlaying(false);
                  goToExhibitionEntered(item);
                }}
              />
            </View>
          </View>
        )}
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
    elevation: 5, // Android
    fontSize: 18,
  },
});
