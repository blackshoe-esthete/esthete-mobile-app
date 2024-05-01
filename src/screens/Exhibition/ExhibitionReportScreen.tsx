import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const reportOptions = [
  '음란성 댓글',
  '광고성 댓글',
  '욕설/반말/부적절한 언어',
  '회원 비방',
  '명예훼손/저작권 침해',
  '도배성 댓글',
  '기타',
];

type ExhibitionReportScreenProps = {
  route: {
    params: {
      reportType: '댓글' | '사진';
    };
  };
};

const ExhibitionReportScreen: React.FC<ExhibitionReportScreenProps> = ({
  route,
}) => {
  const {reportType} = route.params;

  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(reportOptions.length).fill(false),
  );

  const toggleCheckbox = index => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = !updatedOptions[index];
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    const selected = reportOptions.filter((_, index) => selectedOptions[index]);
    console.log('Selected report options:', selected);
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
});

export default ExhibitionReportScreen;
