import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useReportPhoto, useReportComment} from 'src/apis/exhibitionShow';

const reportOptions = [
  '음란성 또는 청소년에게 부적합한 내용',
  '광고성 또는 상업성 게시물',
  '욕설/반말/부적절한 표현',
  '회원 비방',
  '명예훼손/저작권 침해',
  '도배성 게시물',
  '기타',
];

type ExhibitionReportScreenProps = {
  route: {
    params: {
      reportType: '댓글' | '사진';
      photoId?: string;
      commentId?: string;
    };
  };
};

const ExhibitionReportScreen: React.FC<ExhibitionReportScreenProps> = ({route}) => {
  const {reportType, photoId, commentId} = route.params;

  const navigation = useNavigation();
  const [showOtherTextInput, setShowOtherTextInput] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Array(reportOptions.length).fill(false));
  const [otherText, setOtherText] = useState('');

  const toggleCheckbox = (index: number) => {
    const newSelectedOptions = {...selectedOptions, [index]: !selectedOptions[index]};
    setSelectedOptions(newSelectedOptions);
    if (reportOptions[index] === '기타') {
      setShowOtherTextInput(!selectedOptions[index]);
    }
  };

  const reportPhotoMutation = useReportPhoto();
  const reportCommentMutation = useReportComment();

  const handleSubmit = () => {
    const selected = reportOptions.filter((_, index) => selectedOptions[index]);
    const reportDescription = selected.join(', ') + (showOtherTextInput ? `: ${otherText}` : '');

    if (reportType === '사진' && photoId) {
      reportPhotoMutation.mutate(
        {
          photo_id: photoId,
          report_type: reportDescription,
          report_description: otherText,
        },
        {
          onSuccess: () => {
            Alert.alert('신고 성공', '신고가 성공적으로 접수되었습니다.', [
              {
                text: '확인',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
          onError: error => {
            console.error('신고 실패:', error);
            Alert.alert('신고 실패', '신고 접수 중 오류가 발생했습니다.');
          },
        },
      );
    } else if (reportType === '댓글' && commentId) {
      reportCommentMutation.mutate(
        {
          comment_id: commentId,
          report_type: reportDescription,
          report_description: otherText,
        },
        {
          onSuccess: () => {
            Alert.alert('신고 성공', '신고가 성공적으로 접수되었습니다.', [
              {
                text: '확인',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
          onError: error => {
            console.error('신고 실패:', error);
            Alert.alert('신고 실패', '신고 접수 중 오류가 발생했습니다.');
          },
        },
      );
    }
  };

  const handleCancel = () => {
    console.log('Report cancelled');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>{reportType} 신고하기</Text>
        <Text style={styles.description}>
          해당 신고할 경우, 신고자의 서비스 사용이 제한될 수 있으니{'\n'}
          신중하게 신고해주세요.
        </Text>
        <Text style={styles.header}>신고사유</Text>
        <View style={styles.reportOptionsContainer}>
          {reportOptions.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <BouncyCheckbox
                size={25}
                fillColor="#FFD600"
                text={option}
                innerIconStyle={{borderWidth: 1, borderRadius: 5}}
                iconStyle={{borderRadius: 5}}
                onPress={() => toggleCheckbox(index)}
                textStyle={{color: '#fff', textDecorationLine: 'none'}}
              />
            </View>
          ))}
          {showOtherTextInput && (
            <TextInput
              style={styles.textInput}
              placeholder="기타 의견을 작성해주세요"
              placeholderTextColor="#D6D6D6"
              value={otherText}
              onChangeText={setOtherText}
              multiline={true}
              numberOfLines={3}
            />
          )}
        </View>
        <View style={styles.flexbox}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>신고하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginTop: 60,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  flexbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 10,
  },
  reportOptionsContainer: {
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: '#FFD600',
    borderRadius: 10,
    alignItems: 'center',
    padding: 25,
    width: '48%',
    height: 70,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    alignItems: 'center',
    padding: 25,
    width: '48%',
    height: 70,
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  textInput: {
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: '#292929',
    borderRadius: 5,
    color: '#fff',
    textAlignVertical: 'center',
  },
});

export default ExhibitionReportScreen;
