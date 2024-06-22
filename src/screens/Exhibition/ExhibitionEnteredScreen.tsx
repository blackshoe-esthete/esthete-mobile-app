import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RootStackParamList} from '../../types/navigations';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CommentInputBox from '@components/common/CommentInputBox';
import Comment from '@components/ExhibitionScreen/Comment';
import {useExhibitionComments, useExhibitionDetails} from '@hooks/useExhibitionDetails';

type ExhibitionScreenRouteProp = RouteProp<RootStackParamList, 'Exhibition'>;

const ExhibitionEnteredScreen = () => {
  const route = useRoute<ExhibitionScreenRouteProp>();
  const {id} = route.params;

  const exhibitionQuery = useExhibitionDetails(id);
  const commentQuery = useExhibitionComments('d8265394-573e-4d5e-baf0-8b75fe10896e');

  const {data, isLoading} = exhibitionQuery;
  const {data: comments, isLoading: isCommentLoading} = commentQuery;

  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.9;

  const [onLike, setOnLike] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const likesIcon = require('../../assets/icons/likes.png');
  const fillLikesIcon = require('../../assets/icons/push-likes-big.png');
  const commentsIcon = require('../../assets/icons/comments.png');
  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          animatedHeight.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(animatedHeight, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(animatedHeight, {
      toValue: screenHeight,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      animatedHeight.setValue(0);
    });
  };
  if (isLoading || isCommentLoading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.mainPicture}>
            <ExhibitionMainPicture
              title={data.title}
              date={data.date}
              author={data.author}
              authorProfile={data.author_profile_url}
              thumbnail={data.thumbnail_url}
              entered={true}
              isPlaying={false}
              currentExhibitionIndex={id}
            />
          </View>
          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => setOnLike(!onLike)}>
              <Image style={{width: 30, height: 25.6}} source={onLike ? fillLikesIcon : likesIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>
              <Image source={commentsIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.pictures}>
            <ExhibitionPictureList isVisited={true} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>전시회 설명이 노출되는 곳입니다.</Text>
          </View>
          <Text style={styles.title}>위치 정보</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Map')}
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 37.541,
                longitude: 126.986,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
        <View style={styles.modalOverlay} />
        <Animated.View
          style={[styles.modalContainer, {height: modalHeight, transform: [{translateY: animatedHeight}]}]}
          {...panResponder.panHandlers}>
          <View style={styles.commentModalHeader}></View>
          <Text style={styles.commentTitle}>전시회 방명록</Text>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              commentId={comment.comment_id}
              userImg={comment.profile_url}
              userName={comment.name}
              commentDate={comment.date}
              commentText={comment.content}
              isLiked={comment.is_like}
              setModalVisible={setModalVisible}
            />
          ))}
          <CommentInputBox exhibitionId={id} />
        </Animated.View>
      </Modal>
    </View>
  );
};

export default ExhibitionEnteredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030303',
  },
  mainPicture: {
    flex: 1,
  },
  pictures: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 18,
    paddingTop: 20,
    gap: 18,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '95%',
    padding: 10,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 50,
    backgroundColor: '#292929',
    color: '#D6D6D6',
  },
  infoText: {
    color: '#D6D6D6',
    fontSize: 14,
  },
  title: {
    width: '95%',
    textAlign: 'left',
    color: '#ffffff',
    marginBottom: 20,
    fontSize: 16,
  },
  map: {
    width: '95%',
    height: 200,
    marginBottom: 107,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#030303',
    borderRadius: 20,
  },
  commentModalHeader: {
    marginTop: 15,
    marginLeft: '50%',
    transform: [{translateX: -20}],
    justifyContent: 'center',
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#555',
  },
  commentTitle: {
    marginLeft: '50%',
    transform: [{translateX: -38}],
    marginTop: 24,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
