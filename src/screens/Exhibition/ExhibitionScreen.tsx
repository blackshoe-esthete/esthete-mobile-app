import React, {useEffect, useRef, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import {RootStackParamList} from '../../types/navigations';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation-typescript';

type ExhibitionScreenRouteProp = RouteProp<RootStackParamList, 'Exhibition'>;

const ExhibitionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ExhibitionScreenRouteProp>();
  const {id} = route.params;

  const goToExhibitionEntered = (id: string) => {
    navigation.navigate('ExhibitionEntered', {id});
  };

  const goToExhibition = (id: string) => {
    navigation.navigate('Exhibition', {id});
  };

  const cubeRef = useRef<any>(null);
  const [currentExhibitionIndex, setCurrentExhibitionIndex] = useState(0);
  const exhibitionIds = ['123', '456', '789'];

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentExhibitionIndex(prevIndex => {
          let nextIndex = prevIndex + 1;
          if (nextIndex >= exhibitionIds.length) {
            goToExhibition(exhibitionIds[0]);
          } else {
            if (cubeRef.current) {
              cubeRef.current.scrollTo(nextIndex, true);
            }
          }
          return nextIndex;
        });
      }, 3000); // 3초 간격으로 페이지 전환
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, exhibitionIds.length]);

  return (
    <View>
      <CubeNavigationHorizontal ref={cubeRef} loop>
        {exhibitionIds.map((id, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.contentContainer}>
              <View style={styles.mainPicture}>
                <ExhibitionMainPicture
                  entered={false}
                  handlePlayPause={handlePlayPause}
                  isPlaying={isPlaying}
                  currentExhibitionIndex={id}
                />
                <ExhibitionPictureList isVisited={false} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Visit"
                color="#000"
                onPress={() => {
                  setIsPlaying(prevState => !prevState);
                  goToExhibitionEntered('123');
                }}
              />
            </View>
          </View>
        ))}
      </CubeNavigationHorizontal>
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
