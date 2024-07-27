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
  Alert,
} from 'react-native';
import ExhibitionMainPicture from '@components/ExhibitionScreen/ExhibitionMainPicture';
import ExhibitionPictureList from '@components/ExhibitionScreen/ExhibitionPictureList';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import CommentInputBox from '@components/common/CommentInputBox';
import Comment from '@components/ExhibitionScreen/Comment';
import {
  useDislikeComment,
  useDislikeExhibition,
  useExhibitionComments,
  useExhibitionDetails,
  useLikeExhibition,
} from '@hooks/useExhibitionDetails';
import {ExhibitionData, IComment} from '@types/mainExhibitionService.type';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@types/navigations';
import {useProfileStore} from '@store/profileEditStore';

const ExhibitionEnteredScreen = ({route}: {route: {params: {exhibitionData: ExhibitionData; id: string}}}) => {
  const {exhibitionData} = route.params;
  const {id} = route.params;

  const exhibitionQuery = useExhibitionDetails(id);
  const commentQuery = useExhibitionComments(id);

  const {data: exhibibitionDetailData, isLoading} = exhibitionQuery;
  const {data: comments, isLoading: isCommentLoading, refetch} = commentQuery;
  const {mutate: likeExhibition} = useLikeExhibition();
  const {mutate: dislikeExhibition} = useDislikeExhibition();

  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.9;

  const [onLike, setOnLike] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const likesIcon = require('../../assets/icons/likes.png');
  const fillLikesIcon = require('../../assets/icons/push-likes-big.png');
  const commentsIcon = require('../../assets/icons/comments.png');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentUserName = useProfileStore(state => state.nickname); // 현재 사용자 닉네임 가져오기

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

  const onLikePress = () => {
    if (currentUserName === exhibibitionDetailData.author_name) {
      Alert.alert('본인 전시는 좋아요를 누를 수 없습니다.');
      return;
    }

    if (onLike) {
      dislikeExhibition(
        {exhibition_id: id},
        {
          onSuccess: () => {
            setOnLike(false);
          },
          onError: error => {
            console.error('Error unliking the exhibition:', error);
          },
        },
      );
    } else {
      likeExhibition(
        {exhibition_id: id},
        {
          onSuccess: () => {
            setOnLike(true);
          },
          onError: error => {
            console.error('Error liking the exhibition:', error);
          },
        },
      );
    }
  };

  const handleNewComment = async () => {
    await refetch(); // 새 댓글이 추가되면 댓글 데이터를 다시 가져옴
  };

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
  if (isCommentLoading) return <ActivityIndicator size="large" color="#000" />;

  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.mainPicture}>
            <ExhibitionMainPicture
              entered={true}
              exhibitionData={exhibitionData}
              isPlaying={false}
              currentExhibitionIndex={id}
            />
          </View>
          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => onLikePress()}>
              <Image style={{width: 30, height: 25.6}} source={onLike ? fillLikesIcon : likesIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>
              <Image source={commentsIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.pictures}>
            <ExhibitionPictureList isVisited={true} id={id} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {exhibibitionDetailData?.description ? exhibibitionDetailData?.description : '전시 설명이 없습니다.'}
            </Text>
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
                latitude: exhibibitionDetailData?.location.latitude,
                longitude: exhibibitionDetailData?.location.longitude,
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
          {comments.map((comment: IComment, index: number) => (
            <Comment
              key={index}
              commentId={comment.comment_id}
              userImg={comment.profile_url}
              userName={comment.name}
              commentDate={comment.date}
              commentText={comment.content}
              isLiked={comment.is_like}
              setModalVisible={setModalVisible}
              exhibitionAuthorName={exhibitionData.photographer_name} // 전시회 작성자의 닉네임 전달
              currentUserName={currentUserName}
            />
          ))}
          <CommentInputBox
            exhibitionId={id}
            authorName={exhibitionData.photographer_name}
            currentUserName={currentUserName}
            onNewComment={handleNewComment}
          />
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
